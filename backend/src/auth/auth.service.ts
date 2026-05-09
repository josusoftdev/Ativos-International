import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  // ── Registro ───────────────────────────────────────────────────────────────
  async register(dto: RegisterDto) {
    const exists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (exists) {
      throw new ConflictException('Este email já está em uso');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    // Busca plano Starter (gratuito) para novos usuários
    const starterPlan = await this.prisma.plan.findFirst({
      where: { isFree: true },
    });

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        passwordHash,
        planId: starterPlan?.id ?? null,
      },
      select: { id: true, name: true, email: true },
    });

    const tokens = await this.generateTokens(user.id, user.email);
    return { user, ...tokens };
  }

  // ── Login ──────────────────────────────────────────────────────────────────
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) throw new UnauthorizedException('Email ou senha inválidos');

    const passwordMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!passwordMatch) throw new UnauthorizedException('Email ou senha inválidos');

    const tokens = await this.generateTokens(user.id, user.email);
    return {
      user: { id: user.id, name: user.name, email: user.email },
      ...tokens,
    };
  }

  // ── Refresh Token ──────────────────────────────────────────────────────────
  async refreshTokens(refreshToken: string) {
    const stored = await this.prisma.refreshToken.findUnique({
      where: { token: refreshToken },
      include: { user: true },
    });

    if (!stored || stored.expiresAt < new Date()) {
      throw new UnauthorizedException('Refresh token inválido ou expirado');
    }

    // Rotação de token: remove o antigo e gera novo par
    await this.prisma.refreshToken.delete({ where: { id: stored.id } });

    return this.generateTokens(stored.user.id, stored.user.email);
  }

  // ── Logout ─────────────────────────────────────────────────────────────────
  async logout(userId: string) {
    await this.prisma.refreshToken.deleteMany({ where: { userId } });
    return { message: 'Logout realizado com sucesso' };
  }

  // ── Helpers ────────────────────────────────────────────────────────────────
  private async generateTokens(userId: string, email: string) {
    const payload = { sub: userId, email };
    const secret = this.config.get<string>('JWT_SECRET') || 'dev-secret';

    const accessToken = this.jwt.sign(payload, {
      secret,
      expiresIn: this.config.get('JWT_EXPIRES_IN') || '15m',
    });

    const refreshToken = this.jwt.sign(payload, {
      secret,
      expiresIn: '7d',
    });

    // Persiste o refresh token
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.prisma.refreshToken.create({
      data: { token: refreshToken, userId, expiresAt },
    });

    return { accessToken, refreshToken };
  }
}
