"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  href: string;
  children: React.ReactNode;
}

export function NavItem({ href, children }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200
        ${
          isActive
            ? "bg-indigo-600/15 text-indigo-300"
            : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
        }`}
    >
      {isActive && (
        <span className="absolute bottom-0 left-1/2 h-px w-4 -translate-x-1/2 rounded-full bg-indigo-500" />
      )}
      {children}
    </Link>
  );
}
