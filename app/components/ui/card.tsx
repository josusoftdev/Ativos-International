import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  as?: "div" | "article" | "section";
}

export function Card({
  children,
  className = "",
  glow = false,
  as: Tag = "div",
}: CardProps) {
  return (
    <Tag
      className={`rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm
        ${glow ? "card-glow" : ""}
        ${className}`}
    >
      {children}
    </Tag>
  );
}

interface CardHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function CardHeader({ title, description, action }: CardHeaderProps) {
  return (
    <div className="mb-4 flex items-start justify-between gap-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-100">{title}</h2>
        {description && (
          <p className="mt-0.5 text-sm text-slate-400">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
