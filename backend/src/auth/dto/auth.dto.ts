import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

// ── Login DTO ──────────────────────────────────────────────────────────────
export class LoginDto {
  @ApiProperty({ example: 'usuario@email.com', description: 'Email do usuário' })
  @IsEmail({}, { message: 'Digite um email válido' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'MinhaS3nha!', description: 'Senha (mín. 6 caracteres)' })
  @IsString()
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  password: string;
}

// ── Register DTO ───────────────────────────────────────────────────────────
export class RegisterDto {
  @ApiProperty({ example: 'João Silva', description: 'Nome completo (somente letras, 3–60 chars)' })
  @IsString()
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  @MaxLength(60, { message: 'O nome deve ter no máximo 60 caracteres' })
  @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, { message: 'O nome deve conter apenas letras' })
  name: string;

  @ApiProperty({ example: 'joao@email.com' })
  @IsEmail({}, { message: 'Digite um email válido' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'MinhaS3nha!',
    description: 'Mín. 8 chars, ao menos 1 maiúscula e 1 número',
  })
  @IsString()
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
  @Matches(/[A-Z]/, { message: 'Deve conter ao menos uma letra maiúscula' })
  @Matches(/[0-9]/, { message: 'Deve conter ao menos um número' })
  password: string;
}

// ── Refresh Token DTO ──────────────────────────────────────────────────────
export class RefreshTokenDto {
  @ApiProperty({ description: 'Refresh token JWT' })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
