import {
  IsString,
  IsDateString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsArray,
  ValidateNested,
  Min,
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { WorkOrderStatus } from '@prisma/client';

export class CreateWorkOrderEquipmentDto {
  @ApiProperty({ example: 'Wrench Set', description: 'Equipment name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 2, description: 'Quantity', minimum: 1 })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({ example: 45.99, description: 'Cost per unit (mandatory)', minimum: 0 })
  @IsNumber()
  @Min(0)
  cost: number;

  @ApiPropertyOptional({ example: 'Home Depot', description: 'Vendor name' })
  @IsOptional()
  @IsString()
  vendor?: string;

  @ApiPropertyOptional({
    example: 'clx1111111111',
    description: 'Equipment catalog ID (if using catalog item)',
  })
  @IsOptional()
  @IsString()
  equipmentId?: string;
}

export class CreateWorkOrderDto {
  @ApiPropertyOptional({
    example: 'WO-2026-001',
    description: 'Work order number (auto-generated if not provided)',
  })
  @IsOptional()
  @IsString()
  workOrderNumber?: string;

  @ApiProperty({
    example: '2026-02-10T09:00:00.000Z',
    description: 'Scheduled date and time (ISO 8601)',
  })
  @IsDateString()
  scheduledAt: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  estimatedHours?: number;

  @ApiPropertyOptional({ example: 25.5, description: 'Hourly pay rate', minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  payRate?: number;

  @ApiPropertyOptional({ example: 150, description: 'Flat rate for the work order', minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  flatRate?: number;

  @IsString()
  facilityName: string;

  @IsString()
  facilityAddress: string;

  @IsOptional()
  @IsString()
  pointOfContact?: string;

  @IsOptional()
  @IsString()
  tasks?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsEnum(WorkOrderStatus)
  status?: WorkOrderStatus;

  @IsOptional()
  @IsString()
  clientId?: string;

  @IsOptional()
  @IsString()
  technicianId?: string;

  @IsOptional()
  @IsString()
  templateId?: string;

  @ApiPropertyOptional({
    type: [CreateWorkOrderEquipmentDto],
    description: 'Equipment list',
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkOrderEquipmentDto)
  equipment?: CreateWorkOrderEquipmentDto[];
}

export class DuplicateWorkOrderDto {
  @ApiPropertyOptional({
    example: '2026-02-15T09:00:00.000Z',
    description: 'New scheduled date (ISO 8601)',
  })
  @IsOptional()
  @IsDateString()
  scheduledAt?: string;

  @ApiPropertyOptional({
    example: 'clx1234567890',
    description: 'New technician ID',
  })
  @IsOptional()
  @IsString()
  technicianId?: string;

  @ApiPropertyOptional({
    enum: ['ACTIVE', 'COMPLETED', 'PAID'],
    description: 'New status',
  })
  @IsOptional()
  @IsEnum(WorkOrderStatus)
  status?: WorkOrderStatus;
}

export class UpdateWorkOrderDto {
  @IsOptional()
  @IsDateString()
  scheduledAt?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  estimatedHours?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  payRate?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  flatRate?: number;

  @IsOptional()
  @IsString()
  facilityName?: string;

  @IsOptional()
  @IsString()
  facilityAddress?: string;

  @IsOptional()
  @IsString()
  pointOfContact?: string;

  @IsOptional()
  @IsString()
  tasks?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsEnum(WorkOrderStatus)
  status?: WorkOrderStatus;

  @IsOptional()
  @IsString()
  clientId?: string;

  @IsOptional()
  @IsString()
  technicianId?: string;

  @IsOptional()
  @IsString()
  invoiceNumber?: string;

  @ApiPropertyOptional({
    type: [String],
    example: [
      'https://bucket.s3.region.amazonaws.com/work-orders/wo123/before/photo1.jpg',
      'https://bucket.s3.region.amazonaws.com/work-orders/wo123/before/photo2.jpg',
    ],
    description: 'Array of S3 URLs for before-work photos',
  })
  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  beforeWorkPhotos?: string[];

  @ApiPropertyOptional({
    type: [String],
    example: [
      'https://bucket.s3.region.amazonaws.com/work-orders/wo123/after/photo1.jpg',
      'https://bucket.s3.region.amazonaws.com/work-orders/wo123/after/photo2.jpg',
    ],
    description: 'Array of S3 URLs for after-work photos',
  })
  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  afterWorkPhotos?: string[];
}

export class CreateAttachmentDto {
  @ApiProperty({ example: 'wo_1234567890', description: 'Work order ID' })
  @IsString()
  workOrderId: string;

  @ApiProperty({
    example: 'https://bucket.s3.region.amazonaws.com/work-orders/wo123/photo/att_123.jpg',
    description: 'S3 public URL after upload',
  })
  @IsString()
  url: string;

  @ApiPropertyOptional({ example: 'image/jpeg', description: 'MIME type' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({ example: 'Work site photo', description: 'Attachment description' })
  @IsOptional()
  @IsString()
  description?: string;
}

export class RequestAttachmentPresignedUrlDto {
  @ApiProperty({ example: 'wo_1234567890', description: 'Work order ID' })
  @IsString()
  workOrderId: string;

  @ApiProperty({ example: 'photo.jpg', description: 'File name' })
  @IsString()
  fileName: string;

  @ApiProperty({
    example: 'image/jpeg',
    description: 'MIME type',
    enum: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'application/pdf'],
  })
  @IsString()
  contentType: string;

  @ApiProperty({
    enum: ['photo', 'receipt'],
    example: 'photo',
    description: 'Attachment type',
  })
  @IsEnum(['photo', 'receipt'])
  attachmentType: 'photo' | 'receipt';

  @ApiPropertyOptional({ example: 'Work site photo', description: 'Optional description' })
  @IsOptional()
  @IsString()
  description?: string;
}

export class ListWorkOrdersQueryDto {
  @ApiPropertyOptional({
    enum: ['ACTIVE', 'COMPLETED', 'PAID'],
    description: 'Filter by work order status',
  })
  @IsOptional()
  @IsEnum(WorkOrderStatus)
  status?: WorkOrderStatus;

  @ApiPropertyOptional({ example: 'clx1234567890', description: 'Filter by technician ID' })
  @IsOptional()
  @IsString()
  technicianId?: string;

  @ApiPropertyOptional({ example: 'clx9876543210', description: 'Filter by client ID' })
  @IsOptional()
  @IsString()
  clientId?: string;

  @ApiPropertyOptional({
    example: '2026-02-01T00:00:00.000Z',
    description: 'Filter by scheduled date from (ISO 8601)',
  })
  @IsOptional()
  @IsDateString()
  scheduledFrom?: string;

  @ApiPropertyOptional({
    example: '2026-02-28T23:59:59.999Z',
    description: 'Filter by scheduled date to (ISO 8601)',
  })
  @IsOptional()
  @IsDateString()
  scheduledTo?: string;

  @ApiPropertyOptional({
    example: 'WO-2026-001',
    description: 'Search by work order number',
  })
  @IsOptional()
  @IsString()
  workOrderNumber?: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'Page number (default: 1)',
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({
    example: 20,
    description: 'Items per page (default: 20, max: 100)',
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number;

  @ApiPropertyOptional({
    enum: ['scheduledAt', 'createdAt', 'updatedAt', 'workOrderNumber', 'status'],
    example: 'scheduledAt',
    description: 'Sort field',
    default: 'scheduledAt',
  })
  @IsOptional()
  @IsEnum(['scheduledAt', 'createdAt', 'updatedAt', 'workOrderNumber', 'status'])
  sortBy?: 'scheduledAt' | 'createdAt' | 'updatedAt' | 'workOrderNumber' | 'status';

  @ApiPropertyOptional({
    enum: ['asc', 'desc'],
    example: 'asc',
    description: 'Sort order',
    default: 'asc',
  })
  @IsOptional()
  @IsEnum(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc';
}
