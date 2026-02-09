import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ClientsService } from './clients.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { Roles } from './auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { CreateClientDto, UpdateClientDto } from '../common/dto/client.dto';

@ApiTags('clients')
@ApiBearerAuth('JWT-auth')
@Controller('clients')
@UseGuards(JwtAuthGuard)
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all clients',
    description: 'Retrieve a list of all clients',
  })
  @ApiResponse({
    status: 200,
    description: 'List of clients',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          email: { type: 'string' },
          phone: { type: 'string' },
          address: { type: 'string' },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get client details',
    description: 'Get detailed information about a specific client',
  })
  @ApiParam({
    name: 'id',
    description: 'Client ID',
    example: 'clx9876543210',
  })
  @ApiResponse({
    status: 200,
    description: 'Client details',
  })
  @ApiResponse({ status: 404, description: 'Client not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create client (Admin/Manager)',
    description: 'Create a new client',
  })
  @ApiResponse({
    status: 201,
    description: 'Client created successfully',
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin or Manager role required' })
  @ApiResponse({ status: 409, description: 'Client with this email already exists' })
  create(@Body() dto: CreateClientDto) {
    return this.clientsService.create(dto);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update client (Admin/Manager)',
    description: 'Update an existing client',
  })
  @ApiParam({
    name: 'id',
    description: 'Client ID',
    example: 'clx9876543210',
  })
  @ApiResponse({
    status: 200,
    description: 'Client updated successfully',
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin or Manager role required' })
  @ApiResponse({ status: 404, description: 'Client not found' })
  @ApiResponse({ status: 409, description: 'Client with this email already exists' })
  update(@Param('id') id: string, @Body() dto: UpdateClientDto) {
    return this.clientsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete client (Admin only)',
    description: 'Delete a client. Cannot delete if client has associated work orders.',
  })
  @ApiParam({
    name: 'id',
    description: 'Client ID',
    example: 'clx9876543210',
  })
  @ApiResponse({
    status: 200,
    description: 'Client deleted successfully',
  })
  @ApiResponse({ status: 400, description: 'Client has associated work orders' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin role required' })
  @ApiResponse({ status: 404, description: 'Client not found' })
  delete(@Param('id') id: string) {
    return this.clientsService.delete(id);
  }
}
