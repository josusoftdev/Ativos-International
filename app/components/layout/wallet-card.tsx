"use client";

import { useState } from "react";

type Wallet = {
  id: string;
  name: string;
};

type WalletCardProps = {
  wallet: Wallet;
  onRename: (id: string, newName: string) => void;
  onRemove: (id: string) => void;
  onEnter: (id: string) => void;
};

export function WalletCard({ wallet, onRename, onRemove, onEnter }: WalletCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(wallet.name);

  const handleSave = () => {
    if (!name.trim()) return;
    onRename(wallet.id, name.trim());
    setIsEditing(false);
  };

  return (
    <article className="rounded-xl border border-slate-700 bg-slate-900 p-4">
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={() => onEnter(wallet.id)}
          className="flex items-center gap-2 text-left text-lg font-semibold text-slate-100"
        >
          <span>💼</span>
          {wallet.name}
        </button>
        <span className="rounded-md bg-slate-800 px-2 py-1 text-xs text-slate-300">Saldo: ****</span>
      </div>

      {isEditing ? (
        <div className="mt-3 space-y-2">
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-md border border-slate-600 bg-slate-800 px-2 py-1 text-slate-100"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="rounded-md bg-indigo-500 px-3 py-1 text-sm font-medium text-white hover:bg-indigo-400"
            >
              Salvar
            </button>
            <button
              onClick={() => {
                setName(wallet.name);
                setIsEditing(false);
              }}
              className="rounded-md bg-slate-600 px-3 py-1 text-sm font-medium text-white hover:bg-slate-500"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="rounded-md bg-indigo-500 px-3 py-1 text-sm font-medium text-white hover:bg-indigo-400"
          >
            Renomear
          </button>
          <button
            onClick={() => onRemove(wallet.id)}
            className="rounded-md bg-red-600 px-3 py-1 text-sm font-medium text-white hover:bg-red-500"
          >
            Remover
          </button>
          <button
            onClick={() => onEnter(wallet.id)}
            className="rounded-md bg-emerald-500 px-3 py-1 text-sm font-medium text-white hover:bg-emerald-400"
          >
            Entrar
          </button>
        </div>
      )}
    </article>
  );
}