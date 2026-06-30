"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { checkAuth, adminLogout } from "../../context/api";
import { 
  Inbox, 
  FolderGit2, 
  BarChart3, 
  MessageSquareQuote, 
  HelpCircle, 
  LogOut, 
  User, 
  Loader2, 
  Menu, 
  X,
  LayoutDashboard
} from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [adminUser, setAdminUser] = useState<{ name: string; email: string } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check Auth Session
    checkAuth()
      .then((data) => {
        setAdminUser(data.user);
        setIsAuthenticated(true);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Session check failed, redirecting to login:", err);
        router.push("/login");
      });
  }, [router]);

  const handleLogout = async () => {
    try {
      await adminLogout();
      router.push("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const navItems = [
    { name: "Overview & Inbox", href: "/dashboard", icon: Inbox },
    { name: "Portfolio Grid", href: "/dashboard/portfolio", icon: FolderGit2 },
    { name: "Stats Metrics", href: "/dashboard/stats", icon: BarChart3 },
    { name: "Testimonials", href: "/dashboard/testimonials", icon: MessageSquareQuote },
    { name: "FAQs Accordion", href: "/dashboard/faqs", icon: HelpCircle },
  ];

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
        <span className="text-text-muted text-sm tracking-wider uppercase font-medium">
          Verifying security keys...
        </span>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-screen bg-background text-foreground">
      {/* Mobile Top Bar Header */}
      <header className="md:hidden h-16 border-b border-foreground/10 px-4 flex items-center justify-between bg-surface/50 backdrop-blur-md sticky top-0 z-50">
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg text-primary font-[family-name:var(--font-space-grotesk)]">
          <LayoutDashboard className="w-5 h-5" />
          <span>CODEX CONTROL</span>
        </Link>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 border border-foreground/15 rounded hover:bg-foreground/5"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 border-r border-foreground/10 bg-surface/30 backdrop-blur-lg flex flex-col justify-between transition-transform duration-300 md:translate-x-0 md:static md:h-screen
        ${mobileMenuOpen ? "translate-x-0 pt-16 md:pt-0" : "-translate-x-full md:translate-x-0"}
      `}>
        <div className="flex-grow py-6 px-4 space-y-8 overflow-y-auto">
          {/* Logo */}
          <div className="hidden md:flex items-center gap-2.5 font-bold text-xl text-primary font-[family-name:var(--font-space-grotesk)] mb-6 px-2">
            <LayoutDashboard className="w-6 h-6" />
            <span>CODEX CONTROL</span>
          </div>

          {/* Nav Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 h-11 rounded-md text-sm font-medium transition-all group relative
                    ${isActive 
                      ? "bg-primary/10 text-primary border border-primary/20" 
                      : "text-text-muted hover:text-foreground hover:bg-foreground/5 border border-transparent"}
                  `}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-text-muted group-hover:text-foreground"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Area with user and logout */}
        <div className="p-4 border-t border-foreground/10 bg-surface/10 space-y-4">
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
              <User className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <h5 className="font-semibold text-sm truncate text-foreground">{adminUser?.name}</h5>
              <p className="text-xs text-text-muted truncate">{adminUser?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full h-11 flex items-center justify-center gap-2 rounded-md border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Exit Dashboard</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-y-auto h-screen relative p-6 md:p-10 pt-20 md:pt-10">
        <div className="max-w-6xl w-full mx-auto flex-1 flex flex-col">
          {children}
        </div>
      </main>
    </div>
  );
}
