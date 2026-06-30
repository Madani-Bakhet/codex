"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminLogin } from "../../context/api";
import { ShieldAlert, KeyRound, Mail, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      await adminLogin(email, password);
      // Success: Redirect to dashboard overview
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(err.message || "Invalid email or password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center min-h-screen px-4 bg-background relative overflow-hidden">
      {/* Abstract Glowing Accent Orbs in Background */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[96px] -z-10" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[96px] -z-10" />

      <div className="w-full max-w-md p-8 glass-card rounded-xl shadow-2xl transition-all duration-300 hover:border-primary/20 relative">
        {/* Top Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-primary/10 rounded-lg text-primary mb-4 border border-primary/20">
            <KeyRound className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-space-grotesk)] text-foreground tracking-tight">
            CODEX ADMIN
          </h1>
          <p className="text-text-muted mt-2 text-sm">
            Authenticate to access agency control panel
          </p>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-md flex items-start gap-3 text-red-400 text-sm">
            <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-muted">
              Email Address
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-text-muted">
                <Mail className="w-5 h-5" />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 pl-11 pr-4 rounded-md bg-background border border-foreground/10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all text-foreground text-sm"
                placeholder="admin@codex.com"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-text-muted">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-text-muted">
                <KeyRound className="w-5 h-5" />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 pl-11 pr-4 rounded-md bg-background border border-foreground/10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all text-foreground text-sm"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 flex items-center justify-center gap-2 rounded-md bg-foreground text-background font-bold hover:bg-foreground/90 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Verifying credentials...</span>
              </>
            ) : (
              <span>Access Control Panel</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
