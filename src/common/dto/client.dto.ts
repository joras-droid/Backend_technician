import {
  IsString,
  IsOptional,
  IsEmail,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({
    example: 'ABC Manufacturing',
    description: 'Client name',
  })
  @IsString()
  name: string;

  @ApiPropertyOptional({
    example: 'contact@abcmanufacturing.com',
    description: 'Contact email',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    example: '+1234567890',
    description: 'Contact phone',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({
    example: '123 Industrial Blvd, City, State 12345',
    description: 'Client address',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    example: 'Preferred contact: Jane Smith',
    description: 'Additional notes',
  })
  @IsOptional()
  @IsString()
  notes?: string;
}

export class UpdateClientDto {
  @ApiPropertyOptional({
    example: 'ABC Manufacturing',
    description: 'Client name',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'contact@abcmanufacturing.com',
    description: 'Contact email',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    example: '+1234567890',
    description: 'Contact phone',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({
    example: '123 Industrial Blvd, City, State 12345',
    description: 'Client address',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    example: 'Preferred contact: Jane Smith',
    description: 'Additional notes',
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
