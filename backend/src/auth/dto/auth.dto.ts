import { ApiProperty } from '@nestjs/swagger';
import { Transform, type TransformFnParams } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

const trimString = ({ value }: TransformFnParams) =>
  typeof value === 'string' ? value.trim() : value;

const normalizeEmail = ({ value }: TransformFnParams) =>
  typeof value === 'string' ? value.trim().toLowerCase() : value;

export class LoginDto {
  @ApiProperty({ example: 'usuario@email.com', description: 'Email do usuario' })
  @Transform(normalizeEmail)
  @IsEmail({}, { message: 'Digite um email valido' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'MinhaS3nha!', description: 'Senha do usuario' })
  @IsString()
  @MinLength(6, { message: 'A senha deve ter no minimo 6 caracteres' })
  password: string;
}

export class RegisterDto {
  @ApiProperty({
    example: 'Joao Silva',
    description: 'Nome completo, de 3 a 60 caracteres',
  })
  @Transform(trimString)
  @IsString()
  @MinLength(3, { message: 'O nome deve ter no minimo 3 caracteres' })
  @MaxLength(60, { message: 'O nome deve ter no maximo 60 caracteres' })
  @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, {
    message: 'O nome deve conter apenas letras',
  })
  name: string;

  @ApiProperty({ example: 'joao@email.com' })
  @Transform(normalizeEmail)
  @IsEmail({}, { message: 'Digite um email valido' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'MinhaS3nha!',
    description: 'Minimo 8 caracteres, 1 letra maiuscula e 1 numero',
  })
  @IsString()
  @MinLength(8, { message: 'A senha deve ter no minimo 8 caracteres' })
  @Matches(/[A-Z]/, { message: 'Deve conter ao menos uma letra maiuscula' })
  @Matches(/[0-9]/, { message: 'Deve conter ao menos um numero' })
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty({ description: 'Refresh token JWT' })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
