# Ativos International - D5

Dashboard SaaS de criptomoedas com front-end Next.js e back-end NestJS.  
Entrega D5: autenticacao JWT, middleware de seguranca, guards, DTOs de validacao e integracao real do fluxo Login/Cadastro e CRUD inicial de carteiras entre front e back.

## O que foi entregue no D5

- Autenticacao JWT com `accessToken` e `refreshToken`.
- Cadastro, login, refresh e logout conectados ao front-end.
- Sessao salva no front-end e usada nas chamadas protegidas.
- Guard JWT protegendo `users` e `wallets`.
- Middleware de seguranca com `helmet`, CORS e `ValidationPipe` global.
- DTOs com validacao e normalizacao de entrada no back-end.
- Validacao de formularios no front-end com React Hook Form + Zod.
- CRUD inicial de carteiras integrado:
  - listar carteiras;
  - criar carteira;
  - renomear carteira;
  - excluir carteira.
- Estrutura do Next.js corrigida para `frontend/app`.

Andrew, Josué, Felipe Hyczy.

## Como rodar

### Pre-requisitos

- Node.js 18+
- PostgreSQL 14+

### Back-end

```bash
cd backend
npm install
cp .env.example .env
npm run db:generate
npm run db:migrate
npm run start:dev
```

API: `http://localhost:3001/api`  
Swagger: `http://localhost:3001/api/docs`

### Front-end

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

App: `http://localhost:3000`

`frontend/.env.example`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## Variaveis do back-end

`backend/.env.example`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ativos_international"
JWT_SECRET="troque-esse-valor-em-producao-por-algo-aleatorio-256bits"
JWT_EXPIRES_IN="15m"
PORT=3001
FRONTEND_URL="http://localhost:3000"
NODE_ENV="development"
```

## Fluxo de autenticacao

1. O usuario cria conta em `/register` ou entra em `/login`.
2. O front envia os dados para `/api/auth/register` ou `/api/auth/login`.
3. A API valida os DTOs, cria/verifica o usuario e retorna `accessToken`, `refreshToken` e `user`.
4. O front salva a sessao em `localStorage`.
5. Chamadas protegidas usam `Authorization: Bearer <accessToken>`.
6. Se o access token expirar, o front tenta renovar em `/api/auth/refresh`.
7. Logout chama `/api/auth/logout` e limpa a sessao local.

## Endpoints principais

### Auth

| Metodo | Rota | Acesso | Descricao |
|---|---|---|---|
| `POST` | `/api/auth/register` | Publico | Cadastra usuario e retorna tokens |
| `POST` | `/api/auth/login` | Publico | Autentica usuario e retorna tokens |
| `POST` | `/api/auth/refresh` | Publico | Renova tokens via refresh token |
| `POST` | `/api/auth/logout` | Protegido | Encerra a sessao |

### Users

| Metodo | Rota | Acesso | Descricao |
|---|---|---|---|
| `GET` | `/api/users/me` | Protegido | Perfil do usuario autenticado |
| `PATCH` | `/api/users/me` | Protegido | Atualiza nome/avatar |
| `DELETE` | `/api/users/me` | Protegido | Exclui a conta |

### Wallets

| Metodo | Rota | Acesso | Descricao |
|---|---|---|---|
| `GET` | `/api/wallets` | Protegido | Lista carteiras do usuario |
| `GET` | `/api/wallets/:id` | Protegido | Detalha uma carteira |
| `POST` | `/api/wallets` | Protegido | Cria carteira |
| `PATCH` | `/api/wallets/:id` | Protegido | Renomeia carteira |
| `DELETE` | `/api/wallets/:id` | Protegido | Exclui carteira |
| `PUT` | `/api/wallets/:id/assets` | Protegido | Adiciona/atualiza ativo |
| `DELETE` | `/api/wallets/:id/assets/:symbol` | Protegido | Remove ativo |

### Plans

| Metodo | Rota | Acesso | Descricao |
|---|---|---|---|
| `GET` | `/api/plans` | Publico | Lista planos |
| `GET` | `/api/plans/:id` | Publico | Detalha um plano |

## Arquitetura

```text
backend/
  src/
    auth/       JWT, DTOs, controller, service, guard e strategy
    users/      perfil do usuario autenticado
    wallets/    CRUD de carteiras e ativos
    plans/      planos publicos
    prisma/     PrismaService e PrismaModule
  prisma/
    schema.prisma
    migrations/

frontend/
  app/
    (auth)/     login e cadastro
    (main)/     dashboard, carteiras, planos e sobre
    components/ UI, layout e formularios
    lib/        api.ts, schemas.ts e dados de mercado
  public/
```

## Scripts uteis

```bash
# Back-end
npm run start:dev
npm run build
npm run db:generate
npm run db:migrate
npm run db:studio

# Front-end
npm run dev
npm run build
npm run lint
```

## Tecnologias

| Camada | Tecnologias |
|---|---|
| Back-end | NestJS, Prisma, PostgreSQL, Passport JWT, bcrypt, class-validator, Swagger, helmet |
| Front-end | Next.js, React, TypeScript, Tailwind CSS, React Hook Form, Zod, Lucide React |
