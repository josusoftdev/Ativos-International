import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "O email é obrigatório")
    .email("Digite um email válido"),
  password: z
    .string()
    .min(1, "A senha é obrigatória")
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "O nome é obrigatório")
      .min(3, "O nome deve ter no mínimo 3 caracteres")
      .max(60, "O nome deve ter no máximo 60 caracteres")
      .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "O nome deve conter apenas letras"),
    email: z
      .string()
      .min(1, "O email é obrigatório")
      .email("Digite um email válido"),
    password: z
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .regex(/[A-Z]/, "Deve conter ao menos uma letra maiúscula")
      .regex(/[0-9]/, "Deve conter ao menos um número"),
    confirmPassword: z.string().min(1, "Confirme sua senha"),
    termsAccepted: z.literal(true, {
      errorMap: () => ({ message: "Você deve aceitar os termos de uso" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export const newWalletSchema = z.object({
  name: z
    .string()
    .min(1, "O nome é obrigatório")
    .min(2, "O nome deve ter no mínimo 2 caracteres")
    .max(40, "O nome deve ter no máximo 40 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type NewWalletFormData = z.infer<typeof newWalletSchema>;
