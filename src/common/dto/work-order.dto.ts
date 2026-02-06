import {
  IsString,
  IsDateString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsArray,
  ValidateNested,
  Min,
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

  @ApiPropertyOptional({ example: 45.99, description: 'Cost per unit', minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  cost?: number;

  @ApiPropertyOptional({ example: 'Home Depot', description: 'Vendor name' })
  @IsOptional()
  @IsString()
  vendor?: string;
}

export class CreateWorkOrderDto {
  @IsString()
  workOrderNumber: string;

  @IsDateString()
  scheduledAt: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  estimatedHours?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  payRate?: number;

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

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkOrderEquipmentDto)
  equipment?: CreateWorkOrderEquipmentDto[];
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
