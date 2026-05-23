"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { Logo } from "@/app/components/ui/logo";
import { NavItem } from "@/app/components/ui/nav-item";
import { Button } from "@/app/components/ui/button";
import {
  getStoredSession,
  logoutUser,
  type AuthSession,
} from "@/app/lib/api";

const navItems = [
  { href: "/", label: "Mercado" },
  { href: "/wallets", label: "Carteiras" },
  { href: "/plans", label: "Planos" },
  { href: "/about", label: "Sobre" },
];

export function Header() {
  const router = useRouter();
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    const syncSession = () => setSession(getStoredSession());

    syncSession();
    window.addEventListener("storage", syncSession);
    window.addEventListener("auth-session-changed", syncSession);

    return () => {
      window.removeEventListener("storage", syncSession);
      window.removeEventListener("auth-session-changed", syncSession);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } finally {
      setSession(null);
      router.push("/login");
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavItem key={item.href} href={item.href}>
              {item.label}
            </NavItem>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          {session ? (
            <>
              <span className="max-w-44 truncate text-sm text-slate-400">
                {session.user.name}
              </span>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => void handleLogout()}
              >
                <LogOut size={14} />
                Sair
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" href="/login">
                Entrar
              </Button>
              <Button variant="primary" size="sm" href="/register">
                Criar conta
              </Button>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          {session ? (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => void handleLogout()}
            >
              <LogOut size={14} />
              Sair
            </Button>
          ) : (
            <Button variant="secondary" size="sm" href="/login">
              Entrar
            </Button>
          )}
        </div>
      </div>

      <nav className="flex items-center gap-1 overflow-x-auto border-t border-slate-800/40 px-4 py-2 md:hidden">
        {navItems.map((item) => (
          <NavItem key={item.href} href={item.href}>
            {item.label}
          </NavItem>
        ))}
      </nav>
    </header>
  );
}
