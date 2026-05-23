"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Wallet } from "lucide-react";
import { newWalletSchema, type NewWalletFormData } from "@/app/lib/schemas";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";

interface NewWalletFormProps {
  onCreate: (name: string) => boolean | Promise<boolean>;
}

export function NewWalletForm({ onCreate }: NewWalletFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewWalletFormData>({
    resolver: zodResolver(newWalletSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: NewWalletFormData) => {
    const created = await onCreate(data.name);

    if (created) {
      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start"
    >
      <div className="flex-1">
        <Input
          placeholder="Ex: Carteira Principal"
          error={errors.name?.message}
          leftIcon={<Wallet size={15} />}
          {...register("name")}
        />
      </div>
      <Button
        type="submit"
        variant="success"
        size="md"
        loading={isSubmitting}
        className="sm:mt-0 whitespace-nowrap"
      >
        + Criar carteira
      </Button>
    </form>
  );
}
