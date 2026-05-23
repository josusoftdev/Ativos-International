import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateWalletDto,
  UpdateWalletDto,
  UpsertAssetDto,
} from './dto/wallet.dto';

@Injectable()
export class WalletsService {
  constructor(private prisma: PrismaService) {}

  findAll(userId: string) {
    return this.prisma.wallet.findMany({
      where: { userId },
      include: { assets: true },
      orderBy: { createdAt: 'asc' },
    });
  }

  async findOne(userId: string, walletId: string) {
    const wallet = await this.prisma.wallet.findUnique({
      where: { id: walletId },
      include: { assets: true },
    });

    if (!wallet) {
      throw new NotFoundException('Carteira nao encontrada');
    }

    if (wallet.userId !== userId) {
      throw new ForbiddenException();
    }

    return wallet;
  }

  async create(userId: string, dto: CreateWalletDto) {
    try {
      return await this.prisma.wallet.create({
        data: { name: dto.name, userId },
        include: { assets: true },
      });
    } catch (error) {
      this.handleUniqueWalletName(error);
    }
  }

  async update(userId: string, walletId: string, dto: UpdateWalletDto) {
    await this.findOne(userId, walletId);

    try {
      return await this.prisma.wallet.update({
        where: { id: walletId },
        data: dto,
        include: { assets: true },
      });
    } catch (error) {
      this.handleUniqueWalletName(error);
    }
  }

  async remove(userId: string, walletId: string) {
    await this.findOne(userId, walletId);
    await this.prisma.wallet.delete({ where: { id: walletId } });

    return { message: 'Carteira excluida com sucesso' };
  }

  async upsertAsset(userId: string, walletId: string, dto: UpsertAssetDto) {
    await this.findOne(userId, walletId);

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

  async removeAsset(userId: string, walletId: string, symbol: string) {
    await this.findOne(userId, walletId);

    const asset = await this.prisma.walletAsset.findUnique({
      where: { walletId_symbol: { walletId, symbol } },
    });

    if (!asset) {
      throw new NotFoundException(`Ativo ${symbol} nao encontrado nesta carteira`);
    }

    await this.prisma.walletAsset.delete({ where: { id: asset.id } });
    return { message: `Ativo ${symbol} removido com sucesso` };
  }

  private handleUniqueWalletName(error: unknown): never {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new ConflictException('Ja existe uma carteira com esse nome');
    }

    throw error;
  }
}
