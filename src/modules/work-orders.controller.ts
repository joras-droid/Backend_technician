import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
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
  ApiBearerAuth,
} from '@nestjs/swagger';
import { WorkOrdersService } from './work-orders.service';
import { S3Service } from '../common/services/s3.service';
import { JwtAuthGuard } from '../modules/auth/guards/jwt-auth.guard';
import {
  RequestAttachmentPresignedUrlDto,
  CreateAttachmentDto,
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

  @Get('technician/:technicianId')
  @ApiOperation({
    summary: 'Get work orders for a technician',
    description: 'Retrieve all work orders assigned to a specific technician',
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
  getForTechnician(@Param('technicianId') technicianId: string) {
    return this.workOrdersService.findAllForTechnician(technicianId);
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
