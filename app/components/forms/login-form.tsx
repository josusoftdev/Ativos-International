"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { loginSchema, type LoginFormData } from "@/app/lib/schemas";
import { mockLogin } from "@/app/lib/mock-api";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: LoginFormData) => {
    setApiError(null);
    setSuccessMsg(null);
    const result = await mockLogin(data.email, data.password);
    if (!result.success) {
      setApiError(result.error ?? "Erro ao fazer login.");
      return;
    }
    setSuccessMsg(`Bem-vindo de volta! Redirecionando...`);
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-100">Entrar na conta</h1>
          <p className="mt-1 text-sm text-slate-400">
            Acesse o dashboard de criptomoedas
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5"
        >
          <Input
            label="Email"
            type="email"
            placeholder="seu@email.com"
            error={errors.email?.message}
            leftIcon={<Mail size={15} />}
            autoComplete="email"
            {...register("email")}
          />

          <div className="relative">
            <Input
              label="Senha"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              error={errors.password?.message}
              leftIcon={<Lock size={15} />}
              autoComplete="current-password"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-9 text-slate-500 hover:text-slate-300 transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>

          {apiError && (
            <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-400">
              {apiError}
            </div>
          )}

          {successMsg && (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
              {successMsg}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isSubmitting}
            className="mt-2 w-full"
          >
            Entrar
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Não tem conta?{" "}
          <a href="/register" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
            Criar conta gratuita
          </a>
        </p>

        <div className="mt-4 rounded-lg bg-slate-800/60 p-3">
          <p className="text-xs text-slate-500 font-medium mb-1">💡 Demo</p>
          <p className="text-xs text-slate-500">
            Use qualquer email válido. Para simular erro, use:{" "}
            <span className="font-mono text-rose-400">erro@teste.com</span>
          </p>
        </div>
      </div>
    </div>
  );
}
