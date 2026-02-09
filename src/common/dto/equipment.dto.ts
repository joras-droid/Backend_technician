import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEquipmentDto {
  @ApiProperty({
    example: 'Wrench Set',
    description: 'Equipment name (must be unique)',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: 'Professional grade wrench set',
    description: 'Equipment description',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 45.99,
    description: 'Price (mandatory)',
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiPropertyOptional({
    example: 40.0,
    description: 'Minimum price range (optional)',
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minRange?: number;

  @ApiPropertyOptional({
    example: 50.0,
    description: 'Maximum price range (optional)',
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxRange?: number;

  @ApiPropertyOptional({
    example: 'Home Depot',
    description: 'Vendor name',
  })
  @IsOptional()
  @IsString()
  vendor?: string;
}

export class UpdateEquipmentDto {
  @ApiPropertyOptional({
    example: 'Wrench Set',
    description: 'Equipment name',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'Professional grade wrench set',
    description: 'Equipment description',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: 45.99,
    description: 'Price',
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiPropertyOptional({
    example: 40.0,
    description: 'Minimum price range',
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  minRange?: number;

  @ApiPropertyOptional({
    example: 50.0,
    description: 'Maximum price range',
    minimum: 0,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  maxRange?: number;

  @ApiPropertyOptional({
    example: 'Home Depot',
    description: 'Vendor name',
  })
  @IsOptional()
  @IsString()
  vendor?: string;

  @ApiPropertyOptional({
    example: true,
    description: 'Is equipment active',
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class SearchEquipmentQueryDto {
  @ApiProperty({
    example: 'wrench',
    description: 'Search term for equipment name or description (fuzzy search)',
  })
  @IsString()
  search: string;

  @ApiPropertyOptional({
    example: 20,
    description: 'Maximum number of results (default: 20, max: 100)',
    minimum: 1,
    maximum: 100,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number;
}

export class AddCatalogEquipmentDto {
  @ApiProperty({
    example: 'clx1111111111',
    description: 'Equipment ID from catalog',
  })
  @IsString()
  equipmentId: string;

  @ApiProperty({
    example: 2,
    description: 'Quantity',
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  quantity: number;
}

export class AddCustomEquipmentDto {
  @ApiProperty({
    example: 'Custom Tool XYZ',
    description: 'Equipment name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 2,
    description: 'Quantity',
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({
    example: 75.50,
    description: 'Cost per unit (mandatory)',
    minimum: 0,
  })
  @IsNumber()
  @Min(0)
  cost: number;

  @ApiPropertyOptional({
    example: 'Local Hardware Store',
    description: 'Vendor name',
  })
  @IsOptional()
  @IsString()
  vendor?: string;

  @ApiPropertyOptional({
    example: 'https://bucket.s3.region.amazonaws.com/receipts/receipt123.jpg',
    description: 'Receipt URL (optional, upload via presigned URL first)',
  })
  @IsOptional()
  @IsString()
  receiptUrl?: string;
}

export class ApproveEquipmentDto {
  @ApiPropertyOptional({
    example: 'Approved for reimbursement',
    description: 'Approval note (optional)',
  })
  @IsOptional()
  @IsString()
  note?: string;
}

export class RejectEquipmentDto {
  @ApiProperty({
    example: 'Receipt not provided',
    description: 'Reason for rejection (required)',
  })
  @IsString()
  reason: string;
}
