# 🪙 Ativos International - D4
> Dashboard SaaS de criptomoedas 
> Deliver 4 Backend!
> Discentes: Andrew Bertelli, Felipe Hyczy e Josué Farah
> Docente: Professora Isabela Taques Vitek


---
## 🎯 Problema que o SaaS resolve

Investidores de criptomoedas hoje precisam acessar múltiplas plataformas para acompanhar preços, ler notícias e organizar seus portfólios. O Ativos International centraliza tudo isso em uma interface limpa, responsiva e rápida.

**O que resolvemos:**
- Dados espalhados em 5+ plataformas diferentes
- Interfaces pesadas e repletas de anúncios
- Falta de organização de carteiras e portfólios
- Dificuldade de acompanhar notícias relevantes do mercado
---

## 🚀 Como rodar
### Pré-requisitos: Node.js 18+

```bash
git clone https://github.com/seu-usuario/ativos-international.git
cd ativos-international
```

### Backend (NestJS + Prisma)
```bash
cd backend
npm install
npm run db:generate    # Gera Prisma Client
npm run db:migrate     # Executa migrations
npm run start:dev      # Inicia servidor em http://localhost:3001
```

### Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev            # Inicia em http://localhost:3000
```

### Comandos úteis
```bash
# Backend
cd backend
npm run build          # Build de produção
npm run lint           # ESLint
npm run db:studio      # Prisma Studio (GUI)
npm run db:seed        # Populate database

# Frontend
cd frontend
npm run build          # Build de produção
npm run lint           # ESLint
```

---

## 🏗️ Arquitetura

### Backend (NestJS + Prisma)
```
src/
├── main.ts                       # Entry point, porta 3001
├── app.module.ts                 # Root module
├── auth/                         # Autenticacao JWT
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── dto/
│   │   └── auth.dto.ts
│   ├── guards/
│   │   └── jwt-auth.guard.ts
│   └── strategies/
│       └── jwt.strategy.ts
├── users/                        # Gerenciamento de usuarios
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── users.module.ts
│   └── dto/
│       └── update-user.dto.ts
├── wallets/                      # Gerenciamento de carteiras
│   ├── wallets.controller.ts
│   ├── wallets.service.ts
│   ├── wallets.module.ts
│   └── dto/
│       └── wallet.dto.ts
├── plans/                        # Planos e subscricoes
│   ├── plans.controller.ts
│   ├── plans.service.ts
│   └── plans.module.ts
└── prisma/                       # Database
    ├── prisma.service.ts
    ├── prisma.module.ts
    └── schema.prisma

prisma/
├── schema.prisma                 # Modelo de dados
└── migrations/                   # Historico de migrations
```

### Frontend (Next.js + React Hook Form + Zod)
```
app/
├── layout.tsx                    # Root layout (fonte DM Sans, metadata global)
├── (main)/                       # Grupo de rotas com Header
│   ├── layout.tsx                # Layout com Header sticky
│   ├── page.tsx                  # Dashboard: mercado + noticias
│   ├── wallets/page.tsx          # Gestao de carteiras
│   ├── plans/page.tsx            # Planos e precos
│   └── about/page.tsx            # Sobre + FAQ + Contato
├── (auth)/                       # Grupo de rotas autenticacao
│   ├── layout.tsx                # Layout centrado sem header
│   ├── login/page.tsx
│   └── register/page.tsx
├── components/
│   ├── ui/                       # UI Kit (7 componentes)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── badge.tsx
│   │   ├── card.tsx
│   │   ├── stat-card.tsx
│   │   ├── nav-item.tsx
│   │   └── logo.tsx
│   ├── layout/                   # Componentes de dominio
│   │   ├── header.tsx
│   │   ├── crypto-card.tsx
│   │   ├── news-card.tsx
│   │   ├── wallet-card.tsx
│   │   └── plan-card.tsx
│   └── forms/                    # Formularios RHF + Zod
│       ├── login-form.tsx
│       ├── register-form.tsx
│       └── new-wallet-form.tsx
└── lib/
    ├── schemas.ts                # Schemas Zod
    └── mock-api.ts               # Mock API com delay simulado
```

---

## 🧩 UI Kit — 7 Componentes Reutilizáveis

| Componente | Props principais | Descricao |
|---|---|---|
| `Button` | `variant`, `size`, `loading`, `href` | Botao com 5 variantes e spinner |
| `Input` | `label`, `error`, `hint`, `leftIcon` | Input com forwardRef e estados de erro |
| `Badge` | `variant` | 6 variantes de status colorido |
| `Card` | `glow`, `as` | Container com efeito hover e tag semantica |
| `StatCard` | `label`, `value`, `trend`, `icon` | Metrica com indicador de tendencia |
| `NavItem` | `href` | Link com active state automatico |
| `Logo` | `size` | Logo em 3 tamanhos |

---

## 📋 Formulários com React Hook Form + Zod

### LoginForm
- Validacao de email (formato) e senha minimo 6 chars
- Show/hide password, loading state, feedback de API (mock)

### RegisterForm
- Nome: letras apenas, 3-60 chars
- Senha: 8+ chars, maiuscula + numero obrigatorios
- Indicador de forca da senha (fraca/razoavel/boa/forte)
- Confirmacao com `.refine()`, checkbox com `z.literal(true)`

### NewWalletForm
- Nome: 2-40 chars, reset apos submit

---

## 🔑 Tecnologias

### Backend
| Tecnologia | Versao | Uso |
|---|---|---|
| NestJS | 10.0 | Framework backend modular |
| Prisma | 5.21 | ORM para banco de dados |
| PostgreSQL | - | Banco de dados relacional |
| JWT | 10.2 | Autenticacao segura |
| Passport | 0.7 | Estrategias de autenticacao |
| Bcrypt | 5.1 | Hash de senhas |
| Swagger | 7.4 | Documentacao da API |
| TypeScript | 5 | Tipagem estrita |

### Frontend
| Tecnologia | Versao | Uso |
|---|---|---|
| Next.js | 16.2 | App Router, Layouts, SSR |
| React | 19.2 | UI, estado, hooks |
| TypeScript | 5 | Tipagem estrita (sem `any`) |
| Tailwind CSS | 4 | Estilos utilitarios |
| React Hook Form | 7.54 | Gerenciamento de formularios |
| Zod | 3.24 | Validacao de schemas |
| @hookform/resolvers | 3.9 | Integracao RHF + Zod |
| Lucide React | 0.577 | Icones |

---

