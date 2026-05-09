-- Migração Inicial — Ativos International D4
-- Criada em: 2026-05-09
-- ORM: Prisma

-- CreateTable plans
CREATE TABLE "plans" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "isFree" BOOLEAN NOT NULL DEFAULT false,
    "features" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable users
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "avatar_url" TEXT,
    "plan_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable refresh_tokens
CREATE TABLE "refresh_tokens" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "refresh_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable wallets
CREATE TABLE "wallets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wallets_pkey" PRIMARY KEY ("id")
);

-- CreateTable wallet_assets
CREATE TABLE "wallet_assets" (
    "id" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon_url" TEXT,
    "amount" DECIMAL(28,8) NOT NULL,
    "avgPrice" DECIMAL(20,8) NOT NULL,
    "wallet_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wallet_assets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex unique plans.name
CREATE UNIQUE INDEX "plans_name_key" ON "plans"("name");

-- CreateIndex unique users.email
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex unique refresh_tokens.token
CREATE UNIQUE INDEX "refresh_tokens_token_key" ON "refresh_tokens"("token");

-- CreateIndex unique wallets (user_id, name)
CREATE UNIQUE INDEX "wallets_user_id_name_key" ON "wallets"("user_id", "name");

-- CreateIndex unique wallet_assets (wallet_id, symbol)
CREATE UNIQUE INDEX "wallet_assets_wallet_id_symbol_key" ON "wallet_assets"("wallet_id", "symbol");

-- AddForeignKey users -> plans
ALTER TABLE "users" ADD CONSTRAINT "users_plan_id_fkey"
    FOREIGN KEY ("plan_id") REFERENCES "plans"("id")
    ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey refresh_tokens -> users
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_fkey"
    FOREIGN KEY ("user_id") REFERENCES "users"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey wallets -> users
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_user_id_fkey"
    FOREIGN KEY ("user_id") REFERENCES "users"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey wallet_assets -> wallets
ALTER TABLE "wallet_assets" ADD CONSTRAINT "wallet_assets_wallet_id_fkey"
    FOREIGN KEY ("wallet_id") REFERENCES "wallets"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;

-- Seed inicial: Planos
INSERT INTO "plans" ("id", "name", "description", "price", "isFree", "features", "updatedAt") VALUES
  (gen_random_uuid(), 'Starter', 'Plano gratuito para começar', 0.00, true,
   ARRAY['Até 2 carteiras', 'Dados de mercado em tempo real', 'Suporte por email'], NOW()),
  (gen_random_uuid(), 'Pro', 'Ideal para investidores ativos', 49.90, false,
   ARRAY['Carteiras ilimitadas', 'Alertas de preço', 'API de exportação', 'Suporte prioritário'], NOW()),
  (gen_random_uuid(), 'Enterprise', 'Para equipes e gestoras', 199.90, false,
   ARRAY['Tudo do Pro', 'Multi-usuário', 'Dashboard personalizado', 'SLA garantido', 'Onboarding dedicado'], NOW());
