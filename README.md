# 🪙 Ativos International

> Dashboard SaaS de criptomoedas — acompanhe o mercado, gerencie carteiras e fique por dentro das últimas notícias em um único lugar.

---

## 🎯 Problema que o SaaS resolve

Investidores de criptomoedas hoje precisam acessar múltiplas plataformas para acompanhar preços, ler notícias e organizar seus portfólios. O **Ativos International** centraliza tudo isso em uma interface limpa, responsiva e rápida.

**Dores resolvidas:**
- Dados espalhados em 5+ plataformas diferentes
- Interfaces pesadas e repletas de anúncios
- Falta de organização de carteiras e portfólios
- Dificuldade de acompanhar notícias relevantes do mercado

---

## 🔗 Protótipo

> **[Ver protótipo no Figma →](#)** *(substitua pelo link real)*

---

## 🚀 Como rodar

### Pré-requisitos: Node.js 18+

```bash
git clone https://github.com/seu-usuario/ativos-international.git
cd ativos-international
npm install
npm run dev
```

Acesse http://localhost:3000

```bash
npm run dev      # Desenvolvimento
npm run build    # Build de produção
npm run lint     # Zero erros esperado
```

---

## 🏗️ Arquitetura

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
│   │   ├── button.tsx            # 5 variantes + loading state
│   │   ├── input.tsx             # forwardRef, label, error, leftIcon
│   │   ├── badge.tsx             # 6 variantes de status
│   │   ├── card.tsx              # Card + CardHeader
│   │   ├── stat-card.tsx         # Metrica com trend indicator
│   │   ├── nav-item.tsx          # Active state via usePathname
│   │   └── logo.tsx              # 3 tamanhos
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

| Tecnologia | Versao | Uso |
|---|---|---|
| Next.js | 16.2 | App Router, Layouts, SSR |
| React | 19 | UI, estado, hooks |
| TypeScript | 5 | Tipagem estrita (sem `any`) |
| Tailwind CSS | 4 | Estilos utilitarios |
| React Hook Form | 7.54 | Gerenciamento de formularios |
| Zod | 3.24 | Validacao de schemas |
| @hookform/resolvers | 3.9 | Integracao RHF + Zod |
| Lucide React | 0.577 | Icones |

---

## ✅ Criterios Atendidos

**Arquitetura:** App Router + grupos de rota `(main)` e `(auth)` com layouts independentes. Props tipadas com interfaces em todos os componentes. Children pattern em `Card`, `Button`, `NavItem`.

**Qualidade de Codigo:** Zero `any`. `forwardRef` + `displayName` no Input. Schemas isolados em `lib/`. Funcoes auxiliares puras.

**UI/UX:** Responsivo mobile-first. Header sticky com blur. Animacoes de entrada com stagger. Empty state na pagina de carteiras. Active state no NavItem.

**Engenharia de Formularios:** `mode: "onTouched"`, `noValidate`, mensagens em portugues, `.refine()` cross-field, `z.literal(true)` para checkbox, reset apos submit.

---

## 📄 Licença

MIT © Ativos International
