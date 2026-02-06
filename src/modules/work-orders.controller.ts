import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { WorkOrdersService } from './work-orders.service';
import { S3Service } from '../common/services/s3.service';
import { JwtAuthGuard } from '../modules/auth/guards/jwt-auth.guard';
import {
  RequestAttachmentPresignedUrlDto,
  CreateAttachmentDto,
} from '../common/dto/work-order.dto';
import { PresignedUrlResponseDto } from '../common/dto/auth.dto';

@Controller('work-orders')
@UseGuards(JwtAuthGuard)
export class WorkOrdersController {
  constructor(
    private readonly workOrdersService: WorkOrdersService,
    private readonly s3Service: S3Service,
  ) {}

  @Get('technician/:technicianId')
  getForTechnician(@Param('technicianId') technicianId: string) {
    return this.workOrdersService.findAllForTechnician(technicianId);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.workOrdersService.findOne(id);
  }

  @Post(':workOrderId/attachments/presigned-url')
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
  async createAttachment(
    @Param('workOrderId') workOrderId: string,
    @Body() dto: CreateAttachmentDto,
    @Request() req,
  ) {
    return this.workOrdersService.createAttachment(
      workOrderId,
      dto,
      req.user.id,
    );
  }
}
