import {
  IsNumber,
  IsOptional,
  IsString,
  IsDateString,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CheckInDto {
  @ApiProperty({
    example: 40.7128,
    description: 'GPS latitude',
    minimum: -90,
    maximum: 90,
  })
  @IsNumber()
  @Min(-90)
  @Max(90)
  checkInLat: number;

  @ApiProperty({
    example: -74.0060,
    description: 'GPS longitude',
    minimum: -180,
    maximum: 180,
  })
  @IsNumber()
  @Min(-180)
  @Max(180)
  checkInLng: number;
}

export class CheckOutDto {
  @ApiProperty({
    example: 40.7128,
    description: 'GPS latitude',
    minimum: -90,
    maximum: 90,
  })
  @IsNumber()
  @Min(-90)
  @Max(90)
  checkOutLat: number;

  @ApiProperty({
    example: -74.0060,
    description: 'GPS longitude',
    minimum: -180,
    maximum: 180,
  })
  @IsNumber()
  @Min(-180)
  @Max(180)
  checkOutLng: number;
}

export class EditTimeEntryDto {
  @ApiPropertyOptional({
    example: '2026-02-10T09:00:00.000Z',
    description: 'Updated check-in time (ISO 8601)',
  })
  @IsOptional()
  @IsDateString()
  checkInAt?: string;

  @ApiPropertyOptional({
    example: '2026-02-10T13:00:00.000Z',
    description: 'Updated check-out time (ISO 8601)',
  })
  @IsOptional()
  @IsDateString()
  checkOutAt?: string;

  @ApiProperty({
    example: 'Corrected time due to system error',
    description: 'Reason for edit (required for audit trail)',
  })
  @IsString()
  reason: string;
}
