"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { registerSchema, type RegisterFormData } from "@/app/lib/schemas";
import { mockRegister } from "@/app/lib/mock-api";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const password = watch("password", "");

  const getPasswordStrength = (pw: string): { label: string; color: string; width: string } => {
    if (!pw) return { label: "", color: "", width: "w-0" };
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    if (score <= 1) return { label: "Fraca", color: "bg-rose-500", width: "w-1/4" };
    if (score === 2) return { label: "Razoável", color: "bg-amber-500", width: "w-2/4" };
    if (score === 3) return { label: "Boa", color: "bg-yellow-400", width: "w-3/4" };
    return { label: "Forte", color: "bg-emerald-500", width: "w-full" };
  };

  const strength = getPasswordStrength(password);

  const onSubmit = async (data: RegisterFormData) => {
    setApiError(null);
    setSuccessMsg(null);
    const result = await mockRegister(data.name, data.email, data.password);
    if (!result.success) {
      setApiError(result.error ?? "Erro ao criar conta.");
      return;
    }
    setSuccessMsg(result.data?.message ?? "Conta criada com sucesso!");
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-100">Criar conta</h1>
          <p className="mt-1 text-sm text-slate-400">
            Acesse o dashboard gratuitamente
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5"
        >
          <Input
            label="Nome completo"
            type="text"
            placeholder="João Silva"
            error={errors.name?.message}
            leftIcon={<User size={15} />}
            autoComplete="name"
            {...register("name")}
          />

          <Input
            label="Email"
            type="email"
            placeholder="seu@email.com"
            error={errors.email?.message}
            leftIcon={<Mail size={15} />}
            autoComplete="email"
            {...register("email")}
          />

          <div>
            <div className="relative">
              <Input
                label="Senha"
                type={showPassword ? "text" : "password"}
                placeholder="Mínimo 8 caracteres"
                error={errors.password?.message}
                leftIcon={<Lock size={15} />}
                autoComplete="new-password"
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
            {/* Password strength indicator */}
            {password && (
              <div className="mt-2 space-y-1">
                <div className="h-1 w-full rounded-full bg-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${strength.color} ${strength.width}`}
                  />
                </div>
                <p className={`text-xs font-medium ${strength.color.replace("bg-", "text-")}`}>
                  Força da senha: {strength.label}
                </p>
              </div>
            )}
          </div>

          <div className="relative">
            <Input
              label="Confirmar senha"
              type={showConfirm ? "text" : "password"}
              placeholder="Repita a senha"
              error={errors.confirmPassword?.message}
              leftIcon={<Lock size={15} />}
              autoComplete="new-password"
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute right-3 top-9 text-slate-500 hover:text-slate-300 transition-colors"
              tabIndex={-1}
            >
              {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>

          {/* Terms checkbox */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="termsAccepted"
              className="mt-0.5 h-4 w-4 rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-slate-900"
              {...register("termsAccepted")}
            />
            <div>
              <label
                htmlFor="termsAccepted"
                className="text-sm text-slate-400 cursor-pointer"
              >
                Concordo com os{" "}
                <a href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                  termos de uso
                </a>{" "}
                e{" "}
                <a href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                  política de privacidade
                </a>
              </label>
              {errors.termsAccepted && (
                <p className="mt-1 text-xs text-rose-400">
                  {errors.termsAccepted.message}
                </p>
              )}
            </div>
          </div>

          {apiError && (
            <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-400">
              {apiError}
            </div>
          )}

          {successMsg && (
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
              ✓ {successMsg}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isSubmitting}
            className="mt-2 w-full"
          >
            Criar conta gratuita
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Já tem conta?{" "}
          <a href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
            Entrar
          </a>
        </p>
      </div>
    </div>
  );
}
