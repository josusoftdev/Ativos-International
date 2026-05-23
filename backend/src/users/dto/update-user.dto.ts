import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, type TransformFnParams } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

const trimString = ({ value }: TransformFnParams) =>
  typeof value === 'string' ? value.trim() : value;

export class UpdateUserDto {
  @ApiPropertyOptional({ example: 'Joao Silva' })
  @Transform(trimString)
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(60)
  @Matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, {
    message: 'O nome deve conter apenas letras',
  })
  name?: string;

  @ApiPropertyOptional({ example: 'https://cdn.example.com/avatar.png' })
  @Transform(trimString)
  @IsOptional()
  @IsUrl()
  avatarUrl?: string;
}
