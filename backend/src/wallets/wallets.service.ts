import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWalletDto, UpsertAssetDto } from './dto/wallet.dto';

@Injectable()
export class WalletsService {
  constructor(private prisma: PrismaService) {}

  // ── Listar carteiras do usuário ────────────────────────────────────────────
  async findAll(userId: string) {
    return this.prisma.wallet.findMany({
      where: { userId },
      include: { assets: true },
      orderBy: { createdAt: 'asc' },
    });
  }

  // ── Buscar carteira por ID (verifica ownership) ───────────────────────────
  async findOne(userId: string, walletId: string) {
    const wallet = await this.prisma.wallet.findUnique({
      where: { id: walletId },
      include: { assets: true },
    });

    if (!wallet) throw new NotFoundException('Carteira não encontrada');
    if (wallet.userId !== userId) throw new ForbiddenException();

    return wallet;
  }

  // ── Criar carteira ─────────────────────────────────────────────────────────
  async create(userId: string, dto: CreateWalletDto) {
    return this.prisma.wallet.create({
      data: { name: dto.name, userId },
      include: { assets: true },
    });
  }

  // ── Excluir carteira ───────────────────────────────────────────────────────
  async remove(userId: string, walletId: string) {
    await this.findOne(userId, walletId); // valida ownership
    await this.prisma.wallet.delete({ where: { id: walletId } });
    return { message: 'Carteira excluída com sucesso' };
  }

  // ── Adicionar/atualizar ativo ──────────────────────────────────────────────
  async upsertAsset(userId: string, walletId: string, dto: UpsertAssetDto) {
    await this.findOne(userId, walletId); // valida ownership

    return this.prisma.walletAsset.upsert({
      where: { walletId_symbol: { walletId, symbol: dto.symbol } },
      create: {
        walletId,
        symbol: dto.symbol,
        name: dto.name,
        iconUrl: dto.iconUrl,
        amount: dto.amount,
        avgPrice: dto.avgPrice,
      },
      update: {
        amount: dto.amount,
        avgPrice: dto.avgPrice,
        name: dto.name,
        iconUrl: dto.iconUrl,
      },
    });
  }

  // ── Remover ativo da carteira ──────────────────────────────────────────────
  async removeAsset(userId: string, walletId: string, symbol: string) {
    await this.findOne(userId, walletId); // valida ownership

    const asset = await this.prisma.walletAsset.findUnique({
      where: { walletId_symbol: { walletId, symbol } },
    });

    if (!asset) throw new NotFoundException(`Ativo ${symbol} não encontrado nesta carteira`);

    await this.prisma.walletAsset.delete({ where: { id: asset.id } });
    return { message: `Ativo ${symbol} removido com sucesso` };
  }
}
