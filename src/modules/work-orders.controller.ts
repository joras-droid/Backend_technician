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
import { WorkOrdersService } from './work-orders.service';
import { S3Service } from '../common/services/s3.service';
import { JwtAuthGuard } from '../modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '../modules/auth/guards/roles.guard';
import { Roles } from '../modules/auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import {
  RequestAttachmentPresignedUrlDto,
  CreateAttachmentDto,
  ListWorkOrdersQueryDto,
  CreateWorkOrderDto,
  UpdateWorkOrderDto,
  DuplicateWorkOrderDto,
} from '../common/dto/work-order.dto';
import { PresignedUrlResponseDto } from '../common/dto/auth.dto';
import { AuthenticatedRequest } from '../common/interfaces/request.interface';

@ApiTags('work-orders')
@ApiBearerAuth('JWT-auth')
@Controller('work-orders')
@UseGuards(JwtAuthGuard)
export class WorkOrdersController {
  constructor(
    private readonly workOrdersService: WorkOrdersService,
    private readonly s3Service: S3Service,
  ) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({
    summary: 'List all work orders (Admin/Manager)',
    description:
      'Retrieve all work orders with optional filters, pagination, and sorting. Available to ADMIN and MANAGER roles only.',
  })
  @ApiQuery({ name: 'status', required: false, enum: ['ACTIVE', 'COMPLETED', 'PAID'] })
  @ApiQuery({ name: 'technicianId', required: false, type: String })
  @ApiQuery({ name: 'clientId', required: false, type: String })
  @ApiQuery({ name: 'scheduledFrom', required: false, type: String })
  @ApiQuery({ name: 'scheduledTo', required: false, type: String })
  @ApiQuery({ name: 'workOrderNumber', required: false, type: String })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    enum: ['scheduledAt', 'createdAt', 'updatedAt', 'workOrderNumber', 'status'],
  })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'] })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of work orders',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 200 },
        data: {
          type: 'object',
          properties: {
            data: {
              type: 'array',
              items: { type: 'object' },
            },
            pagination: {
              type: 'object',
              properties: {
                page: { type: 'number', example: 1 },
                limit: { type: 'number', example: 20 },
                total: { type: 'number', example: 100 },
                totalPages: { type: 'number', example: 5 },
              },
            },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin or Manager role required' })
  async getAllWorkOrders(@Query() query: ListWorkOrdersQueryDto) {
    return this.workOrdersService.findAll(query);
  }

  @Get('technician')
  @UseGuards(RolesGuard)
  @Roles(UserRole.TECHNICIAN)
  @ApiOperation({
    summary: 'Get my work orders (Technician only)',
    description: 'Retrieve all work orders assigned to the authenticated technician. Active work orders are prioritized. This endpoint is only available to TECHNICIAN role.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of work orders',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          workOrderNumber: { type: 'string' },
          scheduledAt: { type: 'string', format: 'date-time' },
          status: { type: 'string', enum: ['ACTIVE', 'COMPLETED', 'PAID'] },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Technician role required' })
  getMyWorkOrders(@Request() req: AuthenticatedRequest) {
    return this.workOrdersService.findAllForTechnician(req.user.id);
  }

  @Get('technician/:technicianId')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({
    summary: 'Get work orders for a technician (Admin/Manager)',
    description: 'Retrieve all work orders assigned to a specific technician. Requires admin or manager role.',
  })
  @ApiParam({
    name: 'technicianId',
    description: 'Technician user ID',
    example: 'clx1234567890',
  })
  @ApiResponse({
    status: 200,
    description: 'List of work orders',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          workOrderNumber: { type: 'string' },
          scheduledAt: { type: 'string', format: 'date-time' },
          status: { type: 'string', enum: ['ACTIVE', 'COMPLETED', 'PAID'] },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin or Manager role required' })
  getForTechnician(@Param('technicianId') technicianId: string) {
    return this.workOrdersService.findAllForTechnician(technicianId);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create work order (Admin/Manager)',
    description: 'Create a new work order and assign it to a technician',
  })
  @ApiResponse({
    status: 201,
    description: 'Work order created successfully',
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin or Manager role required' })
  @ApiResponse({ status: 404, description: 'Client or technician not found' })
  @ApiResponse({ status: 409, description: 'Work order number already exists' })
  async create(
    @Body() dto: CreateWorkOrderDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.workOrdersService.create(dto, req.user.id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER, UserRole.TECHNICIAN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update work order',
    description: 'Update an existing work order. Technicians can update photos, notes, tasks, and status. Admin/Manager can update all fields.',
  })
  @ApiParam({
    name: 'id',
    description: 'Work order ID',
    example: 'clx1234567890',
  })
  @ApiResponse({
    status: 200,
    description: 'Work order updated successfully',
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin or Manager role required' })
  @ApiResponse({ status: 404, description: 'Work order not found' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateWorkOrderDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.workOrdersService.update(id, dto, req.user.id, req.user.role);
  }

  @Post(':id/duplicate')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Duplicate work order (Admin/Manager)',
    description: 'Create a duplicate of an existing work order with optional modifications',
  })
  @ApiParam({
    name: 'id',
    description: 'Work order ID to duplicate',
    example: 'clx1234567890',
  })
  @ApiResponse({
    status: 201,
    description: 'Work order duplicated successfully',
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin or Manager role required' })
  @ApiResponse({ status: 404, description: 'Work order not found' })
  async duplicate(
    @Param('id') id: string,
    @Body() dto: DuplicateWorkOrderDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.workOrdersService.duplicate(id, dto, req.user.id);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get work order details',
    description: 'Retrieve detailed information about a specific work order including attachments, equipment, and time entries',
  })
  @ApiParam({
    name: 'id',
    description: 'Work order ID',
    example: 'clx1234567890',
  })
  @ApiResponse({
    status: 200,
    description: 'Work order details',
  })
  @ApiResponse({ status: 404, description: 'Work order not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getOne(@Param('id') id: string) {
    return this.workOrdersService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete work order (Admin only)',
    description: 'Delete a work order. Only admins can delete work orders.',
  })
  @ApiParam({
    name: 'id',
    description: 'Work order ID',
    example: 'clx1234567890',
  })
  @ApiResponse({
    status: 200,
    description: 'Work order deleted successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin role required' })
  @ApiResponse({ status: 404, description: 'Work order not found' })
  async delete(
    @Param('id') id: string,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.workOrdersService.delete(id, req.user.id);
  }

  @Post(':workOrderId/attachments/presigned-url')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get presigned URL for work order attachment',
    description: 'Get a presigned URL for uploading photos or receipts to a work order. Upload file directly to S3 using PUT request.',
  })
  @ApiParam({
    name: 'workOrderId',
    description: 'Work order ID',
    example: 'clx1234567890',
  })
  @ApiResponse({
    status: 200,
    description: 'Presigned URL generated successfully',
    type: PresignedUrlResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid file type' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getAttachmentPresignedUrl(
    @Param('workOrderId') workOrderId: string,
    @Body() dto: Omit<RequestAttachmentPresignedUrlDto, 'workOrderId'>,
  ): Promise<PresignedUrlResponseDto> {
    const { fileName, contentType, attachmentType, description } = dto;

    // Validate file type
    if (!this.s3Service.isValidFileType(contentType)) {
      throw new Error('Invalid file type');
    }

    // Generate attachment ID
    const attachmentId = `att_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const fileExtension = fileName.split('.').pop() || 'jpg';

    // Generate S3 key
    const key = this.s3Service.getWorkOrderAttachmentKey(
      workOrderId,
      attachmentId,
      fileExtension,
      attachmentType,
    );

    // Generate presigned URL (1 hour expiration)
    const presignedUrl = await this.s3Service.generatePresignedUrl(
      key,
      contentType,
      3600,
    );

    const publicUrl = this.s3Service.getPublicUrl(key);

    return {
      presignedUrl,
      key,
      publicUrl,
      expiresIn: 3600,
    };
  }

  @Post(':workOrderId/attachments')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create attachment record',
    description: 'Create an attachment record after uploading file to S3 using presigned URL',
  })
  @ApiParam({
    name: 'workOrderId',
    description: 'Work order ID',
    example: 'clx1234567890',
  })
  @ApiResponse({
    status: 201,
    description: 'Attachment created successfully',
  })
  @ApiResponse({ status: 404, description: 'Work order not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async createAttachment(
    @Param('workOrderId') workOrderId: string,
    @Body() dto: CreateAttachmentDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.workOrdersService.createAttachment(
      workOrderId,
      dto,
      req.user.id,
    );
  }
}
