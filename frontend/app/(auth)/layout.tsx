import Link from "next/link";
import { Logo } from "@/app/components/ui/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="mb-8">
        <Logo />
      </div>
      {children}
      <p className="mt-6 text-sm text-slate-500">
        Voltar para o{" "}
        <Link href="/" className="text-indigo-400 hover:text-indigo-300 transition-colors">
          Dashboard
        </Link>
      </p>
    </div>
  );
}
