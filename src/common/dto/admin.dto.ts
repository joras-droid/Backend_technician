import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsEnum,
  IsArray,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';

export class CreateEmployeeDto {
  @ApiProperty({
    description: 'First name of the employee',
    example: 'John',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  firstName: string;

  @ApiProperty({
    description: 'Last name of the employee',
    example: 'Doe',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  lastName: string;

  @ApiProperty({
    description: 'Email address (must be unique)',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password for the employee account',
    example: 'SecurePass123',
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiPropertyOptional({
    description: 'Phone number',
    example: '+1234567890',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({
    description: 'Address',
    example: '123 Main St, City, State 12345',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    description: 'User role',
    enum: UserRole,
    example: UserRole.TECHNICIAN,
    default: UserRole.TECHNICIAN,
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiPropertyOptional({
    description: 'Default pay rate for technician (hourly)',
    example: 25.0,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  defaultPayRate?: number;

  /** Alias for defaultPayRate - accepts either payRate or defaultPayRate from client */
  @ApiPropertyOptional({
    description: 'Pay rate (alias for defaultPayRate)',
    example: 25.0,
    minimum: 0,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  payRate?: number;
}

export class WhitelistEmailDto {
  @ApiProperty({
    description: 'Email address to whitelist',
    example: 'employee@example.com',
  })
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    description: 'First name (optional, can be set during signup)',
    example: 'John',
  })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({
    description: 'Last name (optional, can be set during signup)',
    example: 'Doe',
  })
  @IsOptional()
  @IsString()
  lastName?: string;
}

export class WhitelistEmailsDto {
  @ApiProperty({
    description: 'Array of email addresses to whitelist',
    type: [String],
    example: ['employee1@example.com', 'employee2@example.com'],
  })
  @IsArray()
  @IsEmail({}, { each: true })
  emails: string[];
}

export class EmployeeResponseDto {
  @ApiProperty({ example: 'clx1234567890' })
  id: string;

  @ApiProperty({ example: 'John' })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  lastName: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @ApiPropertyOptional({ example: '+1234567890' })
  phone?: string;

  @ApiPropertyOptional({ example: '123 Main St' })
  address?: string;

  @ApiProperty({ example: 'johndoe' })
  username: string;

  @ApiProperty({ enum: UserRole, example: UserRole.TECHNICIAN })
  role: UserRole;

  @ApiProperty({ example: true })
  whitelisted: boolean;

  @ApiProperty({ example: '2026-02-06T12:00:00Z' })
  createdAt: Date;

  @ApiProperty({ example: '2026-02-06T12:00:00Z' })
  updatedAt: Date;
}
