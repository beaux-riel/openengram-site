"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Key, CreditCard, BookOpen, LogOut } from "lucide-react";
import { getAccount, getToken } from "./lib/api";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/keys", label: "API Keys", icon: Key },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
  { href: "https://github.com/openengram/engram", label: "Docs", icon: BookOpen, external: true },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.replace("/");
      return;
    }
    getAccount()
      .then((a) => {
        setEmail(a.email || "");
        setLoading(false);
      })
      .catch(() => router.replace("/"));
  }, [router]);

  const logout = () => {
    localStorage.removeItem("engram_token");
    router.replace("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[var(--color-background)]">
      {/* Sidebar */}
      <aside className="w-56 border-r border-white/10 p-4 flex flex-col gap-1 shrink-0">
        <Link href="/" className="text-lg font-bold text-gradient mb-6 block">Engram</Link>
        {nav.map((n) => {
          const active = !n.external && pathname === n.href;
          const Icon = n.icon;
          return n.external ? (
            <a
              key={n.href}
              href={n.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted hover:text-foreground hover:bg-white/5 transition-colors"
            >
              <Icon size={16} /> {n.label}
            </a>
          ) : (
            <Link
              key={n.href}
              href={n.href}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                active ? "bg-accent/10 text-accent" : "text-muted hover:text-foreground hover:bg-white/5"
              }`}
            >
              <Icon size={16} /> {n.label}
            </Link>
          );
        })}
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b border-white/10 flex items-center justify-end px-6 gap-4">
          <span className="text-sm text-muted">{email}</span>
          <button onClick={logout} className="flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors">
            <LogOut size={14} /> Logout
          </button>
        </header>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
