"use client";

import { useState } from "react";

type NewWalletFormProps = {
  onCreate: (name: string) => void;
};

export function NewWalletForm({ onCreate }: NewWalletFormProps) {
  const [name, setName] = useState("");

  const handleCreate = () => {
    if (!name.trim()) return;
    onCreate(name.trim());
    setName("");
  };

  return (
    <div className="mt-4 grid gap-3 sm:grid-cols-3">
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Nome da carteira"
        className="rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-slate-100 focus:border-indigo-500 focus:outline-none"
      />
      <div className="sm:col-span-2">
        <button
          onClick={handleCreate}
          className="h-full w-full rounded-md bg-emerald-500 px-4 py-2 font-semibold text-white hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!name.trim()}
        >
          Criar carteira
        </button>
      </div>
    </div>
  );
}