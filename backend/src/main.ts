import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.use(helmet());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Ativos International API')
    .setDescription(
      `
Ativos International - Back-end API (D5)

Dashboard SaaS de criptomoedas com autenticacao JWT, guards, DTOs validados e primeiras rotas CRUD integradas ao front-end.

Modulos disponiveis:
- Auth: login, cadastro, refresh token e logout
- Users: perfil do usuario autenticado
- Wallets: CRUD de carteiras e gerenciamento de ativos
- Plans: planos disponiveis
      `.trim(),
    )
    .setVersion('1.0.0')
    .addTag('auth', 'Autenticacao e sessao')
    .addTag('users', 'Perfil do usuario')
    .addTag('wallets', 'Carteiras de criptomoedas')
    .addTag('plans', 'Planos e precos')
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

  console.log(`API rodando em: http://localhost:${port}/api`);
  console.log(`Swagger UI em:  http://localhost:${port}/api/docs`);
}

bootstrap();
