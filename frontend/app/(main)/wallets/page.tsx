"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, RefreshCcw, Wallet as WalletIcon } from "lucide-react";
import { NewWalletForm } from "@/app/components/forms/new-wallet-form";
import { WalletCard } from "@/app/components/layout/wallet-card";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Card, CardHeader } from "@/app/components/ui/card";
import {
  ApiError,
  clearAuthSession,
  createWallet,
  deleteWallet,
  getApiErrorMessage,
  getProfile,
  getStoredSession,
  getWallets,
  updateWallet,
  type UserProfile,
  type Wallet,
} from "@/app/lib/api";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function toNumber(value: string | number) {
  return typeof value === "number" ? value : Number(value);
}

function getWalletBalance(wallet: Wallet) {
  return wallet.assets.reduce((total, asset) => {
    const amount = toNumber(asset.amount);
    const avgPrice = toNumber(asset.avgPrice);

    if (Number.isNaN(amount) || Number.isNaN(avgPrice)) {
      return total;
    }

    return total + amount * avgPrice;
  }, 0);
}

export default function WalletsPage() {
  const router = useRouter();
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleError = useCallback(
    (error: unknown) => {
      if (error instanceof ApiError && error.status === 401) {
        clearAuthSession();
        router.replace("/login");
        return;
      }

      setApiError(getApiErrorMessage(error));
    },
    [router],
  );

  const loadWalletData = useCallback(async () => {
    if (!getStoredSession()) {
      router.replace("/login");
      return;
    }

    setIsLoading(true);
    setApiError(null);

    try {
      const [nextProfile, nextWallets] = await Promise.all([
        getProfile(),
        getWallets(),
      ]);

      setProfile(nextProfile);
      setWallets(nextWallets);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  }, [handleError, router]);

  useEffect(() => {
    void loadWalletData();
  }, [loadWalletData]);

  const totalBalance = useMemo(
    () =>
      wallets.reduce((total, wallet) => total + getWalletBalance(wallet), 0),
    [wallets],
  );

  const handleCreate = async (name: string) => {
    setApiError(null);

    try {
      const wallet = await createWallet({ name });
      setWallets((current) => [...current, wallet]);
      return true;
    } catch (error) {
      handleError(error);
      return false;
    }
  };

  const handleRemove = async (id: string) => {
    setApiError(null);

    try {
      await deleteWallet(id);
      setWallets((current) => current.filter((wallet) => wallet.id !== id));
      return true;
    } catch (error) {
      handleError(error);
      return false;
    }
  };

  const handleRename = async (id: string, name: string) => {
    setApiError(null);

    try {
      const updatedWallet = await updateWallet(id, { name });
      setWallets((current) =>
        current.map((wallet) => (wallet.id === id ? updatedWallet : wallet)),
      );
      return true;
    } catch (error) {
      handleError(error);
      return false;
    }
  };

  return (
    <div className="page-enter space-y-8">
      <section>
        <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400">
          Gestao
        </span>
        <h1 className="mt-1 text-3xl font-bold text-slate-100">Carteiras</h1>
        <p className="mt-1 text-slate-400">
          Organize e acompanhe seus portfolios de ativos digitais.
        </p>
      </section>

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
            Saldo total
          </p>
          <p className="mt-2 text-3xl font-bold text-emerald-400">
            {currencyFormatter.format(totalBalance)}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Calculado pelos ativos cadastrados
          </p>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Plano atual
          </p>
          <div className="mt-2 flex items-center gap-2">
            <Badge variant="info">{profile?.plan?.name ?? "Starter"}</Badge>
            <span className="text-xs text-slate-500">
              {profile?.email ?? "sessao ativa"}
            </span>
          </div>
          <a
            href="/plans"
            className="mt-2 inline-block text-xs text-indigo-400 transition-colors hover:text-indigo-300"
          >
            Ver planos
          </a>
        </div>
      </section>

      {apiError && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
          {apiError}
        </div>
      )}

      <Card>
        <CardHeader
          title="Minhas Carteiras"
          description={`${wallets.length} carteira${wallets.length !== 1 ? "s" : ""} cadastrada${wallets.length !== 1 ? "s" : ""}`}
          action={
            <Button
              variant="ghost"
              size="sm"
              onClick={() => void loadWalletData()}
              disabled={isLoading}
            >
              <RefreshCcw size={14} />
              Atualizar
            </Button>
          }
        />

        {isLoading ? (
          <div className="rounded-xl border border-slate-800 bg-slate-950/40 px-4 py-8 text-center text-sm text-slate-400">
            Carregando carteiras...
          </div>
        ) : wallets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-2xl bg-slate-800/50 p-5 text-indigo-300">
              <WalletIcon size={34} />
            </div>
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
                wallet={{
                  id: wallet.id,
                  name: wallet.name,
                  balance: currencyFormatter.format(getWalletBalance(wallet)),
                }}
                onRename={handleRename}
                onRemove={handleRemove}
              />
            ))}
          </div>
        )}
      </Card>

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
