import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  CreateWalletDto,
  UpdateWalletDto,
  UpsertAssetDto,
} from './dto/wallet.dto';
import { WalletsService } from './wallets.service';
import { AuthenticatedRequest } from '../auth/types/authenticated-request';

@ApiTags('wallets')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar carteiras do usuario autenticado' })
  @ApiResponse({ status: 200, description: 'Lista de carteiras com ativos' })
  findAll(@Request() req: AuthenticatedRequest) {
    return this.walletsService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter carteira por ID' })
  @ApiParam({ name: 'id', description: 'UUID da carteira' })
  @ApiResponse({ status: 200, description: 'Carteira com ativos' })
  @ApiResponse({ status: 404, description: 'Carteira nao encontrada' })
  findOne(@Request() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.walletsService.findOne(req.user.id, id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar nova carteira' })
  @ApiResponse({ status: 201, description: 'Carteira criada' })
  @ApiResponse({ status: 409, description: 'Ja existe uma carteira com esse nome' })
  create(@Request() req: AuthenticatedRequest, @Body() dto: CreateWalletDto) {
    return this.walletsService.create(req.user.id, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Renomear carteira' })
  @ApiParam({ name: 'id', description: 'UUID da carteira' })
  @ApiResponse({ status: 200, description: 'Carteira atualizada' })
  @ApiResponse({ status: 409, description: 'Ja existe uma carteira com esse nome' })
  update(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: UpdateWalletDto,
  ) {
    return this.walletsService.update(req.user.id, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Excluir carteira e seus ativos' })
  @ApiParam({ name: 'id', description: 'UUID da carteira' })
  @ApiResponse({ status: 200, description: 'Carteira excluida' })
  remove(@Request() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.walletsService.remove(req.user.id, id);
  }

  @Put(':id/assets')
  @ApiOperation({ summary: 'Adicionar ou atualizar ativo por simbolo' })
  @ApiParam({ name: 'id', description: 'UUID da carteira' })
  @ApiResponse({ status: 200, description: 'Ativo salvo' })
  upsertAsset(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() dto: UpsertAssetDto,
  ) {
    return this.walletsService.upsertAsset(req.user.id, id, dto);
  }

  @Delete(':id/assets/:symbol')
  @ApiOperation({ summary: 'Remover ativo da carteira pelo simbolo' })
  @ApiParam({ name: 'id', description: 'UUID da carteira' })
  @ApiParam({ name: 'symbol', description: 'Simbolo do ativo' })
  @ApiResponse({ status: 200, description: 'Ativo removido' })
  removeAsset(
    @Request() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Param('symbol') symbol: string,
  ) {
    return this.walletsService.removeAsset(req.user.id, id, symbol.toUpperCase());
  }
}
