import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PlansService } from './plans.service';

@ApiTags('plans')
@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  // GET /api/plans  (público — exibido na landing page)
  @Get()
  @ApiOperation({ summary: 'Listar todos os planos disponíveis (público)' })
  @ApiResponse({ status: 200, description: 'Lista de planos ordenada por preço' })
  findAll() {
    return this.plansService.findAll();
  }

  // GET /api/plans/:id
  @Get(':id')
  @ApiOperation({ summary: 'Detalhes de um plano específico' })
  @ApiParam({ name: 'id', description: 'UUID do plano' })
  @ApiResponse({ status: 200, description: 'Detalhes do plano' })
  @ApiResponse({ status: 404, description: 'Plano não encontrado' })
  findOne(@Param('id') id: string) {
    return this.plansService.findOne(id);
  }
}
