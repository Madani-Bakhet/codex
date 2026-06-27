"use client";

import Link from "next/link";
import { ThemeToggle } from "./ui/ThemeToggle";
import { Code2, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/Button";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#services", label: "Services" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#about", label: "About" },
    { href: "#faq", label: "FAQ" },
  ];

  // Optional: Add scroll spy logic to update activeSection based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href.substring(1));
      let current = "home";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.getElementById(href.substring(1));
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 64, // offset for fixed navbar
        behavior: "smooth"
      });
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 glass-card border-x-0 border-t-0 rounded-none border-b border-white/10 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="#home" onClick={(e) => handleScrollTo(e, "#home")} className="flex items-center gap-2 text-primary font-bold text-xl tracking-tighter">
          <Code2 className="w-6 h-6" />
          <span className="font-[family-name:var(--font-space-grotesk)]">CODEX</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === link.href.substring(1) ? "text-primary" : "text-text-muted"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <a href="#contact" onClick={(e) => handleScrollTo(e, "#contact")}>
            <Button variant="primary" glow>Get Started</Button>
          </a>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden glass-card absolute top-16 left-0 w-full border-x-0 border-t-0 border-b-0 rounded-none p-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleScrollTo(e, link.href)}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === link.href.substring(1) ? "text-primary" : "text-text-muted"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a href="#contact" onClick={(e) => handleScrollTo(e, "#contact")} className="mt-2 block w-full">
            <Button variant="primary" glow className="w-full">Get Started</Button>
          </a>
        </div>
      )}
    </header>
  );
}
