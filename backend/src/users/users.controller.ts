import { Controller, Get, Patch, Delete, Body, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('users')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /api/users/me
  @Get('me')
  @ApiOperation({ summary: 'Obter perfil do usuário autenticado' })
  @ApiResponse({ status: 200, description: 'Perfil com plano atual' })
  getProfile(@Request() req: any) {
    return this.usersService.getProfile(req.user.id);
  }

  // PATCH /api/users/me
  @Patch('me')
  @ApiOperation({ summary: 'Atualizar nome ou avatar do usuário' })
  @ApiResponse({ status: 200, description: 'Perfil atualizado' })
  updateProfile(@Request() req: any, @Body() dto: UpdateUserDto) {
    return this.usersService.updateProfile(req.user.id, dto);
  }

  // DELETE /api/users/me
  @Delete('me')
  @ApiOperation({ summary: 'Excluir conta permanentemente' })
  @ApiResponse({ status: 200, description: 'Conta excluída' })
  deleteAccount(@Request() req: any) {
    return this.usersService.deleteAccount(req.user.id);
  }
}
