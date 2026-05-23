import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform, Type, type TransformFnParams } from 'class-transformer';

const trimString = ({ value }: TransformFnParams) =>
  typeof value === 'string' ? value.trim() : value;

const normalizeSymbol = ({ value }: TransformFnParams) =>
  typeof value === 'string' ? value.trim().toUpperCase() : value;

export class CreateWalletDto {
  @ApiProperty({ example: 'Carteira Principal', description: '2 a 40 caracteres' })
  @Transform(trimString)
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'O nome deve ter no minimo 2 caracteres' })
  @MaxLength(40, { message: 'O nome deve ter no maximo 40 caracteres' })
  name: string;
}

export class UpdateWalletDto {
  @ApiPropertyOptional({
    example: 'Carteira Longo Prazo',
    description: '2 a 40 caracteres',
  })
  @Transform(trimString)
  @IsOptional()
  @IsString()
  @MinLength(2, { message: 'O nome deve ter no minimo 2 caracteres' })
  @MaxLength(40, { message: 'O nome deve ter no maximo 40 caracteres' })
  name?: string;
}

export class UpsertAssetDto {
  @ApiProperty({ example: 'BTC', description: 'Simbolo do ativo' })
  @Transform(normalizeSymbol)
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Z0-9]{2,12}$/, {
    message: 'O simbolo deve ter de 2 a 12 letras ou numeros',
  })
  symbol: string;

  @ApiProperty({ example: 'Bitcoin' })
  @Transform(trimString)
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    example: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
  })
  @IsOptional()
  @IsUrl()
  iconUrl?: string;

  @ApiProperty({ example: 0.5, description: 'Quantidade do ativo' })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  amount: number;

  @ApiProperty({ example: 188350.12, description: 'Preco medio de compra em BRL' })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  avgPrice: number;
}
