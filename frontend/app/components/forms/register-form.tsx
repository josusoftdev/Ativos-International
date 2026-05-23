"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { registerSchema, type RegisterFormData } from "@/app/lib/schemas";
import { getApiErrorMessage, registerUser } from "@/app/lib/api";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

type PasswordStrength = {
  label: string;
  barClass: string;
  textClass: string;
  widthClass: string;
};

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
  });

  const password = useWatch({ control, name: "password", defaultValue: "" });

  const getPasswordStrength = (value: string): PasswordStrength => {
    if (!value) {
      return {
        label: "",
        barClass: "",
        textClass: "",
        widthClass: "w-0",
      };
    }

    let score = 0;
    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    if (score <= 1) {
      return {
        label: "Fraca",
        barClass: "bg-rose-500",
        textClass: "text-rose-400",
        widthClass: "w-1/4",
      };
    }

    if (score === 2) {
      return {
        label: "Razoavel",
        barClass: "bg-amber-500",
        textClass: "text-amber-400",
        widthClass: "w-2/4",
      };
    }

    if (score === 3) {
      return {
        label: "Boa",
        barClass: "bg-yellow-400",
        textClass: "text-yellow-300",
        widthClass: "w-3/4",
      };
    }

    return {
      label: "Forte",
      barClass: "bg-emerald-500",
      textClass: "text-emerald-400",
      widthClass: "w-full",
    };
  };

  const strength = getPasswordStrength(password);

  const onSubmit = async (data: RegisterFormData) => {
    setApiError(null);
    setSuccessMsg(null);

    try {
      await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      setSuccessMsg("Conta criada. Abrindo suas carteiras...");
      router.push("/wallets");
    } catch (error) {
      setApiError(getApiErrorMessage(error));
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-100">Criar conta</h1>
          <p className="mt-1 text-sm text-slate-400">
            Cadastre-se para gerenciar suas carteiras.
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
            placeholder="Joao Silva"
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
                placeholder="Minimo 8 caracteres"
                error={errors.password?.message}
                leftIcon={<Lock size={15} />}
                autoComplete="new-password"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-3 top-9 text-slate-500 transition-colors hover:text-slate-300"
                tabIndex={-1}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            {password && (
              <div className="mt-2 space-y-1">
                <div className="h-1 w-full rounded-full bg-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${strength.barClass} ${strength.widthClass}`}
                  />
                </div>
                <p className={`text-xs font-medium ${strength.textClass}`}>
                  Forca da senha: {strength.label}
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
              onClick={() => setShowConfirm((value) => !value)}
              className="absolute right-3 top-9 text-slate-500 transition-colors hover:text-slate-300"
              tabIndex={-1}
              aria-label={showConfirm ? "Ocultar senha" : "Mostrar senha"}
            >
              {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>

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
                className="cursor-pointer text-sm text-slate-400"
              >
                Concordo com os{" "}
                <a
                  href="#"
                  className="text-indigo-400 transition-colors hover:text-indigo-300"
                >
                  termos de uso
                </a>{" "}
                e{" "}
                <a
                  href="#"
                  className="text-indigo-400 transition-colors hover:text-indigo-300"
                >
                  politica de privacidade
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
            Criar conta gratuita
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Ja tem conta?{" "}
          <Link
            href="/login"
            className="font-medium text-indigo-400 transition-colors hover:text-indigo-300"
          >
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
