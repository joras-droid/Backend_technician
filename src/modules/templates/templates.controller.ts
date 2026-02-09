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
import { TemplatesService } from './templates.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import {
  CreateWorkOrderTemplateDto,
  UpdateWorkOrderTemplateDto,
} from '../../common/dto/template.dto';

@ApiTags('work-order-templates')
@ApiBearerAuth('JWT-auth')
@Controller('work-order-templates')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.MANAGER)
export class TemplatesController {
  constructor(private readonly templatesService: TemplatesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'List all work order templates',
    description: 'Get list of all work order templates',
  })
  @ApiResponse({
    status: 200,
    description: 'List of templates',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin or Manager role required' })
  findAll() {
    return this.templatesService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get template details',
    description: 'Get detailed information about a specific template',
  })
  @ApiParam({
    name: 'id',
    description: 'Template ID',
    example: 'clx1111111111',
  })
  @ApiResponse({
    status: 200,
    description: 'Template details',
  })
  @ApiResponse({ status: 404, description: 'Template not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin or Manager role required' })
  findOne(@Param('id') id: string) {
    return this.templatesService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create work order template',
    description: 'Create a new reusable work order template',
  })
  @ApiResponse({
    status: 201,
    description: 'Template created successfully',
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin or Manager role required' })
  create(@Body() dto: CreateWorkOrderTemplateDto) {
    return this.templatesService.create(dto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update work order template',
    description: 'Update an existing work order template',
  })
  @ApiParam({
    name: 'id',
    description: 'Template ID',
    example: 'clx1111111111',
  })
  @ApiResponse({
    status: 200,
    description: 'Template updated successfully',
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin or Manager role required' })
  @ApiResponse({ status: 404, description: 'Template not found' })
  update(@Param('id') id: string, @Body() dto: UpdateWorkOrderTemplateDto) {
    return this.templatesService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete work order template',
    description: 'Delete a work order template',
  })
  @ApiParam({
    name: 'id',
    description: 'Template ID',
    example: 'clx1111111111',
  })
  @ApiResponse({
    status: 200,
    description: 'Template deleted successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin or Manager role required' })
  @ApiResponse({ status: 404, description: 'Template not found' })
  delete(@Param('id') id: string) {
    return this.templatesService.delete(id);
  }
}
