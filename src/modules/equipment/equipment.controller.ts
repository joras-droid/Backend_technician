import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { EquipmentService } from './equipment.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import {
  CreateEquipmentDto,
  UpdateEquipmentDto,
  SearchEquipmentQueryDto,
  AddCatalogEquipmentDto,
  AddCustomEquipmentDto,
  ApproveEquipmentDto,
  RejectEquipmentDto,
} from '../../common/dto/equipment.dto';
import { AuthenticatedRequest } from '../../common/interfaces/request.interface';

@ApiTags('equipment')
@ApiBearerAuth('JWT-auth')
@Controller('equipment')
@UseGuards(JwtAuthGuard)
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.TECHNICIAN, UserRole.MANAGER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'List all equipment',
    description: 'Get list of all active equipment in the catalog. Available to Admin, Manager, and Technician.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of equipment',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin, Manager, or Technician role required' })
  findAll() {
    return this.equipmentService.findAll();
  }

  @Get('search')
  @UseGuards(RolesGuard)
  @Roles(UserRole.TECHNICIAN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Search equipment (Technician only)',
    description: 'Search equipment using fuzzy logic. Searches by name, description, and vendor.',
  })
  @ApiQuery({ name: 'search', required: true, type: String, description: 'Search term' })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
  @ApiResponse({
    status: 200,
    description: 'List of matching equipment',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Technician role required' })
  search(@Query() query: SearchEquipmentQueryDto) {
    return this.equipmentService.search(query);
  }

  @Get('pending-approvals')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get pending equipment approvals (Admin/Manager)',
    description: 'Get all custom equipment waiting for approval',
  })
  @ApiResponse({
    status: 200,
    description: 'List of pending equipment approvals',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin or Manager role required' })
  getPendingApprovals() {
    return this.equipmentService.getPendingApprovals();
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.TECHNICIAN, UserRole.MANAGER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get equipment details',
    description: 'Get detailed information about a specific equipment. Available to Admin, Manager, and Technician.',
  })
  @ApiParam({
    name: 'id',
    description: 'Equipment ID',
    example: 'clx1111111111',
  })
  @ApiResponse({
    status: 200,
    description: 'Equipment details',
  })
  @ApiResponse({ status: 404, description: 'Equipment not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin, Manager, or Technician role required' })
  findOne(@Param('id') id: string) {
    return this.equipmentService.findOne(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create equipment (Admin only)',
    description: 'Add new equipment to the catalog with price (mandatory) and optional price range',
  })
  @ApiResponse({
    status: 201,
    description: 'Equipment created successfully',
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin role required' })
  @ApiResponse({ status: 409, description: 'Equipment name already exists' })
  create(@Body() dto: CreateEquipmentDto) {
    return this.equipmentService.create(dto);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update equipment (Admin only)',
    description: 'Update equipment information',
  })
  @ApiParam({
    name: 'id',
    description: 'Equipment ID',
    example: 'clx1111111111',
  })
  @ApiResponse({
    status: 200,
    description: 'Equipment updated successfully',
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin role required' })
  @ApiResponse({ status: 404, description: 'Equipment not found' })
  @ApiResponse({ status: 409, description: 'Equipment name already exists' })
  update(@Param('id') id: string, @Body() dto: UpdateEquipmentDto) {
    return this.equipmentService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete equipment (Admin only)',
    description: 'Delete equipment from catalog',
  })
  @ApiParam({
    name: 'id',
    description: 'Equipment ID',
    example: 'clx1111111111',
  })
  @ApiResponse({
    status: 200,
    description: 'Equipment deleted successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin role required' })
  @ApiResponse({ status: 404, description: 'Equipment not found' })
  delete(@Param('id') id: string) {
    return this.equipmentService.delete(id);
  }

  @Post(':id/approve')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Approve custom equipment (Admin/Manager)',
    description: 'Approve custom equipment. Approved equipment cost will be included in total cost calculations.',
  })
  @ApiParam({
    name: 'id',
    description: 'Equipment ID',
    example: 'clx2222222222',
  })
  @ApiResponse({
    status: 200,
    description: 'Equipment approved successfully',
  })
  @ApiResponse({ status: 400, description: 'Equipment already processed or not custom' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin or Manager role required' })
  @ApiResponse({ status: 404, description: 'Equipment not found' })
  approve(
    @Param('id') id: string,
    @Body() dto: ApproveEquipmentDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.equipmentService.approveEquipment(id, dto, req.user.id);
  }

  @Post(':id/reject')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Reject custom equipment (Admin/Manager)',
    description: 'Reject custom equipment. Rejected equipment cost will NOT be included in total cost calculations.',
  })
  @ApiParam({
    name: 'id',
    description: 'Equipment ID',
    example: 'clx2222222222',
  })
  @ApiResponse({
    status: 200,
    description: 'Equipment rejected successfully',
  })
  @ApiResponse({ status: 400, description: 'Equipment already processed or not custom' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin or Manager role required' })
  @ApiResponse({ status: 404, description: 'Equipment not found' })
  reject(
    @Param('id') id: string,
    @Body() dto: RejectEquipmentDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.equipmentService.rejectEquipment(id, dto, req.user.id);
  }
}

@ApiTags('work-orders')
@ApiBearerAuth('JWT-auth')
@Controller('work-orders/:workOrderId/equipment')
@UseGuards(JwtAuthGuard)
export class WorkOrderEquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.TECHNICIAN)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Add catalog equipment to work order (Technician only)',
    description: 'Add equipment from the catalog to a work order. Equipment is pre-approved and cost is immediately included in totals.',
  })
  @ApiParam({
    name: 'workOrderId',
    description: 'Work order ID',
    example: 'clx1234567890',
  })
  @ApiResponse({
    status: 201,
    description: 'Catalog equipment added successfully',
  })
  @ApiResponse({ status: 400, description: 'Work order not assigned to you or equipment not active' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Technician role required' })
  @ApiResponse({ status: 404, description: 'Work order or equipment not found' })
  addCatalogEquipment(
    @Param('workOrderId') workOrderId: string,
    @Body() dto: AddCatalogEquipmentDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.equipmentService.addCatalogEquipment(
      workOrderId,
      dto,
      req.user.id,
    );
  }

  @Post('custom')
  @UseGuards(RolesGuard)
  @Roles(UserRole.TECHNICIAN)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Add custom equipment (Technician only)',
    description: 'Add custom equipment to a work order. Requires approval from admin/manager. Creates notifications.',
  })
  @ApiParam({
    name: 'workOrderId',
    description: 'Work order ID',
    example: 'clx1234567890',
  })
  @ApiResponse({
    status: 201,
    description: 'Custom equipment added successfully (pending approval)',
  })
  @ApiResponse({ status: 400, description: 'Work order not assigned to you' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Technician role required' })
  @ApiResponse({ status: 404, description: 'Work order not found' })
  addCustomEquipment(
    @Param('workOrderId') workOrderId: string,
    @Body() dto: AddCustomEquipmentDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.equipmentService.addCustomEquipment(
      workOrderId,
      dto,
      req.user.id,
    );
  }
}

