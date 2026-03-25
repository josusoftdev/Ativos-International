"use client";

import { useState } from "react";
import { WalletCard } from "@/app/components/layout/wallet-card";
import { NewWalletForm } from "@/app/components/forms/new-wallet-form";
import { Card, CardHeader } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import { Wallet, Plus } from "lucide-react";

interface WalletData {
  id: string;
  name: string;
  balance: string;
}

const INITIAL_WALLETS: WalletData[] = [
  { id: "w1", name: "Carteira Principal", balance: "R$ 12.450,00" },
  { id: "w2", name: "Holding BTC", balance: "R$ 188.350,12" },
];

export default function WalletsPage() {
  const [wallets, setWallets] = useState<WalletData[]>(INITIAL_WALLETS);

  const handleCreate = (name: string) => {
    const newWallet: WalletData = {
      id: `w-${Date.now()}`,
      name,
      balance: "R$ 0,00",
    };
    setWallets((prev) => [...prev, newWallet]);
  };

  const handleRemove = (id: string) => {
    setWallets((prev) => prev.filter((w) => w.id !== id));
  };

  const handleRename = (id: string, newName: string) => {
    setWallets((prev) =>
      prev.map((w) => (w.id === id ? { ...w, name: newName } : w)),
    );
  };

  return (
    <div className="page-enter space-y-8">
      {/* Header */}
      <section>
        <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
          Gestão
        </span>
        <h1 className="mt-1 text-3xl font-bold text-slate-100">Carteiras</h1>
        <p className="mt-1 text-slate-400">
          Organize e acompanhe seus portfólios de ativos digitais.
        </p>
      </section>

      {/* Summary */}
      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Carteiras ativas
          </p>
          <p className="mt-2 text-4xl font-bold text-slate-100">
            {wallets.length}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Saldo Total
          </p>
          <p className="mt-2 text-3xl font-bold text-emerald-400">••••••</p>
          <p className="mt-1 text-xs text-slate-500">Clique no card para ver</p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Plano atual
          </p>
          <div className="mt-2 flex items-center gap-2">
            <Badge variant="info">Básico</Badge>
            <span className="text-xs text-slate-500">até 3 carteiras</span>
          </div>
          <a
            href="/plans"
            className="mt-2 inline-block text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Fazer upgrade →
          </a>
        </div>
      </section>

      {/* Wallet list */}
      <Card>
        <CardHeader
          title="Minhas Carteiras"
          description={`${wallets.length} carteira${wallets.length !== 1 ? "s" : ""} cadastrada${wallets.length !== 1 ? "s" : ""}`}
          action={
            <span className="rounded-full bg-indigo-600/15 p-2 text-indigo-400">
              <Wallet size={16} />
            </span>
          }
        />

        {wallets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-2xl bg-slate-800/50 p-5 text-4xl">💼</div>
            <p className="mt-4 font-medium text-slate-300">
              Nenhuma carteira criada
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Crie sua primeira carteira abaixo.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {wallets.map((wallet) => (
              <WalletCard
                key={wallet.id}
                wallet={wallet}
                onRename={handleRename}
                onRemove={handleRemove}
              />
            ))}
          </div>
        )}
      </Card>

      {/* Create new */}
      <Card>
        <CardHeader
          title="Nova Carteira"
          description="Adicione uma nova carteira para organizar seus ativos"
          action={
            <span className="rounded-full bg-emerald-600/15 p-2 text-emerald-400">
              <Plus size={16} />
            </span>
          }
        />
        <NewWalletForm onCreate={handleCreate} />
      </Card>
    </div>
  );
}
