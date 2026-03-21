import Link from "next/link";

type NavItemProps = {
  href: string;
  children: React.ReactNode;
};

export function NavItem({ href, children }: NavItemProps) {
  return (
    <Link
      href={href}
      className="rounded-md px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-700 hover:text-white"
    >
      {children}
    </Link>
  );
}
