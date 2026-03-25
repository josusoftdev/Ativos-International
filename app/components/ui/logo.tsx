import Link from "next/link";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

export function Logo({ size = "md" }: LogoProps) {
  const sizes = {
    sm: { badge: "text-xs px-1.5 py-0.5", text: "text-base" },
    md: { badge: "text-sm px-2 py-0.5", text: "text-lg" },
    lg: { badge: "text-base px-2.5 py-1", text: "text-2xl" },
  };

  return (
    <Link href="/" className="group flex items-center gap-2.5">
      <span
        className={`${sizes[size].badge} rounded-md bg-indigo-600 font-bold tracking-tight text-white shadow-lg shadow-indigo-600/30`}
      >
        AI
      </span>
      <span
        className={`${sizes[size].text} font-semibold tracking-wide text-slate-200 transition-colors group-hover:text-white`}
      >
        Ativos International
      </span>
    </Link>
  );
}
