import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "O email e obrigatorio")
    .email("Digite um email valido")
    .transform((email) => email.toLowerCase()),
  password: z
    .string()
    .min(1, "A senha e obrigatoria")
    .min(6, "A senha deve ter no minimo 6 caracteres"),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(1, "O nome e obrigatorio")
      .min(3, "O nome deve ter no minimo 3 caracteres")
      .max(60, "O nome deve ter no maximo 60 caracteres")
      .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "O nome deve conter apenas letras"),
    email: z
      .string()
      .trim()
      .min(1, "O email e obrigatorio")
      .email("Digite um email valido")
      .transform((email) => email.toLowerCase()),
    password: z
      .string()
      .min(8, "A senha deve ter no minimo 8 caracteres")
      .regex(/[A-Z]/, "Deve conter ao menos uma letra maiuscula")
      .regex(/[0-9]/, "Deve conter ao menos um numero"),
    confirmPassword: z.string().min(1, "Confirme sua senha"),
    termsAccepted: z.literal(true, {
      errorMap: () => ({ message: "Voce deve aceitar os termos de uso" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas nao coincidem",
    path: ["confirmPassword"],
  });

export const newWalletSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "O nome e obrigatorio")
    .min(2, "O nome deve ter no minimo 2 caracteres")
    .max(40, "O nome deve ter no maximo 40 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type NewWalletFormData = z.infer<typeof newWalletSchema>;
