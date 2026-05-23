"use client";

import { useState } from "react";
import {
  Check,
  Eye,
  EyeOff,
  Pencil,
  Trash2,
  Wallet as WalletIcon,
  X,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

interface Wallet {
  id: string;
  name: string;
  balance?: string;
}

interface WalletCardProps {
  wallet: Wallet;
  onRename: (id: string, newName: string) => boolean | Promise<boolean>;
  onRemove: (id: string) => boolean | Promise<boolean>;
}

export function WalletCard({ wallet, onRename, onRemove }: WalletCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(wallet.name);
  const [showBalance, setShowBalance] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  const handleSave = async () => {
    const trimmed = editName.trim();
    if (!trimmed) return;

    setIsSaving(true);
    const saved = await onRename(wallet.id, trimmed);
    setIsSaving(false);

    if (saved) {
      setEditName(trimmed);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditName(wallet.name);
    setIsEditing(false);
  };

  const handleRemove = async () => {
    setIsRemoving(true);
    const removed = await onRemove(wallet.id);
    setIsRemoving(false);

    if (!removed) {
      setIsEditing(false);
    }
  };

  return (
    <article className="card-glow rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-indigo-600/15 text-indigo-300">
            <WalletIcon size={18} />
          </div>
          <div className="min-w-0">
            {isEditing ? (
              <Input
                value={editName}
                onChange={(event) => setEditName(event.target.value)}
                className="h-8 py-1 text-sm"
                onKeyDown={(event) => {
                  if (event.key === "Enter") void handleSave();
                  if (event.key === "Escape") handleCancel();
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
          className="inline-flex min-h-8 flex-shrink-0 items-center gap-2 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-400 transition-colors hover:text-slate-200"
          title={showBalance ? "Ocultar saldo" : "Mostrar saldo"}
          type="button"
        >
          {showBalance ? <EyeOff size={14} /> : <Eye size={14} />}
          {showBalance ? wallet.balance ?? "R$ 0,00" : "******"}
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {isEditing ? (
          <>
            <Button
              size="sm"
              variant="primary"
              onClick={() => void handleSave()}
              loading={isSaving}
            >
              <Check size={14} />
              Salvar
            </Button>
            <Button size="sm" variant="secondary" onClick={handleCancel}>
              <X size={14} />
              Cancelar
            </Button>
          </>
        ) : (
          <>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                setEditName(wallet.name);
                setIsEditing(true);
              }}
            >
              <Pencil size={14} />
              Renomear
            </Button>
            <Button
              size="sm"
              variant="danger"
              onClick={() => void handleRemove()}
              loading={isRemoving}
            >
              <Trash2 size={14} />
              Remover
            </Button>
          </>
        )}
      </div>
    </article>
  );
}
