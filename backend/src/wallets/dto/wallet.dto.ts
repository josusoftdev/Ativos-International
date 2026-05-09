import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsNumber,
  IsPositive,
  IsOptional,
  IsUrl,
} from 'class-validator';

// ── Criar carteira ─────────────────────────────────────────────────────────
export class CreateWalletDto {
  @ApiProperty({ example: 'Carteira Principal', description: '2–40 caracteres' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'O nome deve ter no mínimo 2 caracteres' })
  @MaxLength(40, { message: 'O nome deve ter no máximo 40 caracteres' })
  name: string;
}

// ── Adicionar/atualizar ativo na carteira ──────────────────────────────────
export class UpsertAssetDto {
  @ApiProperty({ example: 'BTC', description: 'Símbolo do ativo (ex: BTC, ETH)' })
  @IsString()
  @IsNotEmpty()
  symbol: string;

  @ApiProperty({ example: 'Bitcoin' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png' })
  @IsOptional()
  @IsUrl()
  iconUrl?: string;

  @ApiProperty({ example: 0.5, description: 'Quantidade do ativo' })
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({ example: 188350.12, description: 'Preço médio de compra em BRL' })
  @IsNumber()
  @IsPositive()
  avgPrice: number;
}
