import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-white">
      <span className="text-2xl font-bold tracking-wide text-white">AI
      </span>
      <span className="text-lg font-bold tracking-wide text-white">ATIVOS INTERNATIONAL</span>
    </Link>
  );
}
