import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { WalletsService } from './wallets.service';
import { CreateWalletDto, UpsertAssetDto } from './dto/wallet.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('wallets')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  // GET /api/wallets
  @Get()
  @ApiOperation({ summary: 'Listar todas as carteiras do usuário autenticado' })
  @ApiResponse({ status: 200, description: 'Lista de carteiras com ativos' })
  findAll(@Request() req: any) {
    return this.walletsService.findAll(req.user.id);
  }

  // GET /api/wallets/:id
  @Get(':id')
  @ApiOperation({ summary: 'Obter carteira específica por ID' })
  @ApiParam({ name: 'id', description: 'UUID da carteira' })
  @ApiResponse({ status: 200, description: 'Carteira com todos os ativos' })
  @ApiResponse({ status: 404, description: 'Carteira não encontrada' })
  findOne(@Request() req: any, @Param('id') id: string) {
    return this.walletsService.findOne(req.user.id, id);
  }

  // POST /api/wallets
  @Post()
  @ApiOperation({ summary: 'Criar nova carteira' })
  @ApiResponse({ status: 201, description: 'Carteira criada' })
  @ApiResponse({ status: 409, description: 'Já existe uma carteira com esse nome' })
  create(@Request() req: any, @Body() dto: CreateWalletDto) {
    return this.walletsService.create(req.user.id, dto);
  }

  // DELETE /api/wallets/:id
  @Delete(':id')
  @ApiOperation({ summary: 'Excluir carteira (remove todos os ativos)' })
  @ApiParam({ name: 'id', description: 'UUID da carteira' })
  @ApiResponse({ status: 200, description: 'Carteira excluída' })
  remove(@Request() req: any, @Param('id') id: string) {
    return this.walletsService.remove(req.user.id, id);
  }

  // PUT /api/wallets/:id/assets
  @Put(':id/assets')
  @ApiOperation({ summary: 'Adicionar ou atualizar ativo na carteira (upsert por símbolo)' })
  @ApiParam({ name: 'id', description: 'UUID da carteira' })
  @ApiResponse({ status: 200, description: 'Ativo salvo' })
  upsertAsset(
    @Request() req: any,
    @Param('id') id: string,
    @Body() dto: UpsertAssetDto,
  ) {
    return this.walletsService.upsertAsset(req.user.id, id, dto);
  }

  // DELETE /api/wallets/:id/assets/:symbol
  @Delete(':id/assets/:symbol')
  @ApiOperation({ summary: 'Remover ativo da carteira pelo símbolo' })
  @ApiParam({ name: 'id', description: 'UUID da carteira' })
  @ApiParam({ name: 'symbol', description: 'Símbolo do ativo (ex: BTC)' })
  @ApiResponse({ status: 200, description: 'Ativo removido' })
  removeAsset(
    @Request() req: any,
    @Param('id') id: string,
    @Param('symbol') symbol: string,
  ) {
    return this.walletsService.removeAsset(req.user.id, id, symbol.toUpperCase());
  }
}
