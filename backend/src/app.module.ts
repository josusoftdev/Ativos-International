import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WalletsModule } from './wallets/wallets.module';
import { PlansModule } from './plans/plans.module';

@Module({
  imports: [
    // Variáveis de ambiente disponíveis globalmente
    ConfigModule.forRoot({ isGlobal: true }),

    // Módulos da aplicação
    PrismaModule,
    AuthModule,
    UsersModule,
    WalletsModule,
    PlansModule,
  ],
})
export class AppModule {}
