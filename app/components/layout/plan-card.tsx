import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";

interface PlanCardProps {
  name: string;
  price: number;
  description: string;
  benefits: string[];
  highlighted?: boolean;
  ctaText?: string;
  tag?: string;
}

export function PlanCard({
  name,
  price,
  description,
  benefits,
  highlighted = false,
  ctaText = "Escolher Plano",
  tag,
}: PlanCardProps) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-8 transition-all duration-300 hover:scale-[1.02]
        ${highlighted
          ? "border-indigo-500/50 bg-indigo-600/5 shadow-xl shadow-indigo-500/10"
          : "border-slate-800 bg-slate-900/60"
        }`}
    >
      {tag && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant="info" className="shadow-lg shadow-indigo-500/20">
            {tag}
          </Badge>
        </div>
      )}

      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-100">{name}</h3>
          <p className="mt-1 text-sm text-slate-400">{description}</p>
        </div>
      </div>

      <div className="mt-6 flex items-baseline gap-1">
        <span className="text-xs font-medium text-slate-400">R$</span>
        <span className="text-5xl font-extrabold tracking-tight text-slate-100">
          {price}
        </span>
        <span className="text-sm text-slate-500">/mês</span>
      </div>

      <div className="my-6 h-px bg-slate-800" />

      <ul className="flex-1 space-y-3">
        {benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-3 text-sm text-slate-300">
            <svg
              className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M13.5 4.5L6 12L2.5 8.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {benefit}
          </li>
        ))}
      </ul>

      <Button
        variant={highlighted ? "primary" : "secondary"}
        size="lg"
        className="mt-8 w-full"
        href="/register"
      >
        {ctaText}
      </Button>
    </div>
  );
}
