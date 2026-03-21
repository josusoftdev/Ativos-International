"use client";

import { useState } from "react";
import { NewWalletForm } from "@/app/components/layout/new-wallet-form";
import { WalletCard } from "@/app/components/layout/wallet-card";
import { Header } from "@/app/components/layout/header";

export default function WalletsPage() {
  const [wallets, setWallets] = useState([
    { id: "w1", name: "Carteira 1" },
    { id: "w2", name: "Carteira 2" },
  ]);

  const handleCreate = (name: string) => {
    setWallets((prev) => [
      ...prev,
      { id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`, name },
    ]);
  };

  const handleRemove = (id: string) => {
    setWallets((prev) => prev.filter((wallet) => wallet.id !== id));
  };

  const handleRename = (id: string, name: string) => {
    setWallets((prev) => prev.map((wallet) => (wallet.id === id ? { ...wallet, name } : wallet)));
  };

  const handleEnter = () => {};

  return (
    <div className="min-h-screen bg-[#050813] text-slate-100">
      <Header />

      <main className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-bold text-slate-100">Carteiras</h1>
        <p className="mt-2 text-slate-300">Gerencie suas carteiras e acesse-as individualmente.</p>

        <section className="mt-6 rounded-xl border border-slate-700 bg-slate-900 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Saldo total</p>
              <p className="text-3xl font-bold text-emerald-300">****</p>
            </div>
            <div className="rounded-lg bg-indigo-600 px-4 py-2 text-white">💼 Total</div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-2">
          {wallets.map((wallet) => (
            <WalletCard
              key={wallet.id}
              wallet={wallet}
              onRename={handleRename}
              onRemove={handleRemove}
              onEnter={handleEnter}
            />
          ))}
        </section>

        <section className="mt-6 rounded-xl border border-slate-700 bg-slate-900 p-5">
          <h2 className="text-lg font-semibold text-slate-100">Criar nova carteira</h2>
          <NewWalletForm onCreate={handleCreate} />
        </section>
      </main>
    </div>
  );
}
