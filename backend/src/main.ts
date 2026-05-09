import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ── Prefixo global de API ──────────────────────────────────────────────────
  app.setGlobalPrefix('api');

  // ── Validação global (class-validator) ────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,         // Remove campos não declarados no DTO
      forbidNonWhitelisted: true,
      transform: true,         // Converte tipos automaticamente
    }),
  );

  // ── CORS ──────────────────────────────────────────────────────────────────
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  // ── Swagger ───────────────────────────────────────────────────────────────
  const config = new DocumentBuilder()
    .setTitle('Ativos International API')
    .setDescription(
      `
## 🪙 Ativos International — Back-end API (D4)

Dashboard SaaS de criptomoedas.  
Autenticação via **JWT Bearer Token**.

### Módulos disponíveis
- **Auth** — Login, registro e refresh de tokens
- **Users** — Perfil do usuário autenticado
- **Wallets** — Gerenciamento de carteiras e ativos
- **Plans** — Planos e assinaturas disponíveis
      `.trim(),
    )
    .setVersion('1.0.0')
    .addTag('auth', 'Autenticação e sessão')
    .addTag('users', 'Perfil do usuário')
    .addTag('wallets', 'Carteiras de criptomoedas')
    .addTag('plans', 'Planos e preços')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
    },
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`\n🚀 API rodando em: http://localhost:${port}/api`);
  console.log(`📄 Swagger UI em:  http://localhost:${port}/api/docs\n`);
}

bootstrap();
