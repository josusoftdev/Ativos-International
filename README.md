# 🪙 Ativos International - Entrega Parcial D3. 
> Dashboard SaaS de criptomoedas 
> Deliver da "The Front-End Experience" de acordo com os termos e requisitos solicitados
> Discentes: Julio Guzzo Kuster, Andrew Bertelli, Felipe Hyczy e Josué Farah
> Docente: Professor Mestre. Giovane Galvão.

---
## 💼 Responsabilidades e Esclarecimentos Requisitados
- O trabalho foi dividido tendo EM VISTA todas as responsábilidades e divisões de trabalhos do grupo no bimestre, seminários, apresentações e etc, e de acordo com os domínios e tempos de cada integrante.

-Josué Farah: foi responsável pelo vesrsionamento via git, auxílio aos outros membros no uso do git, revisão das entregas e dos readmes enviados, sendo responsável pela criação dos forms com rook form e zod e revisão dos mesmos a partir de D2. Arquitetou a Mock API. 

-Julio Guzzo: idealizador do SaaS, criou a ideia, fez o protótipo de alta fidelidade, projetou os primeiros formulários com zod que depois foram revisados, idealizou toda a dashboard e organizou o grupo, deu as ideias para a aplicação e auxiliou na estilização, foi responsável pela primeira entrega

Felipe Hyczy: estilizou e construiu todo o layout/dashboard e seus componentes junto com o Julio, pesquisou a documentação typescript, construiu a dashboard e o layout, foi responsável pela segunda entrega, sendo o arquiteto do ui kit.

Andrew Bertelli: video-gravou a apresentação, arquitetou a compilação e revisão da ultima entrega, foi o responsável por apoiar o grupo em diversas tarefas, sendo principalmente responsável em todas as entregas pelas pesquisas, cleancode e revisões gerais.

Foi utilizado o padrão internacional de commits para o presente trabalho (Conventional Commits 1.0.0)
Os maiories desafios foram a comunicação em grupo para realização do trabalho, a habituação ao uso de TERMOS TÉCNICOS e o COSTUME ao uso do NEXT-JS e suas ferramentas, sendo muito fácil a confusão com a declaração de classes deste framework e suas ferramentas com o laravel e PHP. Acreditamos ter tido grande evolução do grupo em: versionamento, uso do terminal de modo geral e lógica de programação.

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

