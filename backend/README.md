# Ativos International API - D5

Back-end NestJS da plataforma Ativos International. Esta entrega adiciona autenticacao JWT completa, middleware de seguranca, guards, DTOs validados e rotas CRUD iniciais prontas para consumo pelo front-end.

## Recursos D5

- `POST /api/auth/register`, `login`, `refresh` e `logout`.
- Access token de curta duracao e refresh token persistido no banco.
- `JwtAuthGuard` com Passport JWT.
- Rotas protegidas para perfil e carteiras.
- `helmet`, CORS e `ValidationPipe` global.
- DTOs com `class-validator` e normalizacao via `class-transformer`.
- CRUD de carteiras: listar, detalhar, criar, renomear e excluir.
- Swagger em `/api/docs` com Bearer Auth.

## Como rodar

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

## Variaveis de ambiente

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ativos_international"
JWT_SECRET="troque-esse-valor-em-producao-por-algo-aleatorio-256bits"
JWT_EXPIRES_IN="15m"
PORT=3001
FRONTEND_URL="http://localhost:3000"
NODE_ENV="development"
```

## Endpoints

### Auth

| Metodo | Rota | Acesso |
|---|---|---|
| `POST` | `/api/auth/register` | Publico |
| `POST` | `/api/auth/login` | Publico |
| `POST` | `/api/auth/refresh` | Publico |
| `POST` | `/api/auth/logout` | Protegido |

### Users

| Metodo | Rota | Acesso |
|---|---|---|
| `GET` | `/api/users/me` | Protegido |
| `PATCH` | `/api/users/me` | Protegido |
| `DELETE` | `/api/users/me` | Protegido |

### Wallets

| Metodo | Rota | Acesso |
|---|---|---|
| `GET` | `/api/wallets` | Protegido |
| `GET` | `/api/wallets/:id` | Protegido |
| `POST` | `/api/wallets` | Protegido |
| `PATCH` | `/api/wallets/:id` | Protegido |
| `DELETE` | `/api/wallets/:id` | Protegido |
| `PUT` | `/api/wallets/:id/assets` | Protegido |
| `DELETE` | `/api/wallets/:id/assets/:symbol` | Protegido |

### Plans

| Metodo | Rota | Acesso |
|---|---|---|
| `GET` | `/api/plans` | Publico |
| `GET` | `/api/plans/:id` | Publico |

## Estrutura

```text
src/
  main.ts
  app.module.ts
  auth/
    dto/auth.dto.ts
    guards/jwt-auth.guard.ts
    strategies/jwt.strategy.ts
  users/
    dto/update-user.dto.ts
  wallets/
    dto/wallet.dto.ts
  plans/
  prisma/
prisma/
  schema.prisma
  migrations/
```

## Scripts

```bash
npm run start:dev
npm run build
npm run db:generate
npm run db:migrate
npm run db:studio
```
