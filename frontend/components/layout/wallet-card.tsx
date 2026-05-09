"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

interface Wallet {
  id: string;
  name: string;
  balance?: string;
}

interface WalletCardProps {
  wallet: Wallet;
  onRename: (id: string, newName: string) => void;
  onRemove: (id: string) => void;
}

export function WalletCard({ wallet, onRename, onRemove }: WalletCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(wallet.name);
  const [showBalance, setShowBalance] = useState(false);

  const handleSave = () => {
    const trimmed = editName.trim();
    if (!trimmed) return;
    onRename(wallet.id, trimmed);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(wallet.name);
    setIsEditing(false);
  };

  return (
    <article className="card-glow rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-600/15 text-xl">
            💼
          </div>
          <div className="min-w-0">
            {isEditing ? (
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="h-8 py-1 text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSave();
                  if (e.key === "Escape") handleCancel();
                }}
                autoFocus
              />
            ) : (
              <p className="truncate font-semibold text-slate-100">
                {wallet.name}
              </p>
            )}
          </div>
        </div>

        <button
          onClick={() => setShowBalance((prev) => !prev)}
          className="flex-shrink-0 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
          title={showBalance ? "Ocultar saldo" : "Mostrar saldo"}
        >
          {showBalance ? wallet.balance ?? "R$ 0,00" : "••••••"}
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {isEditing ? (
          <>
            <Button size="sm" variant="primary" onClick={handleSave}>
              Salvar
            </Button>
            <Button size="sm" variant="secondary" onClick={handleCancel}>
              Cancelar
            </Button>
          </>
        ) : (
          <>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setIsEditing(true)}
            >
              Renomear
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => onRemove(wallet.id)}
            >
              Remover
            </Button>
          </>
        )}
      </div>
    </article>
  );
}
