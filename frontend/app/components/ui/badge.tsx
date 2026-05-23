import React from "react";

type BadgeVariant = "default" | "success" | "danger" | "warning" | "info" | "outline";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-slate-800 text-slate-300 border border-slate-700",
  success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  danger: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
  warning: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  info: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
  outline: "border border-slate-600 text-slate-300",
};

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
