import {
  IsString,
  IsOptional,
  IsEnum,
  IsNumber,
  Min,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';

export class ListUsersQueryDto {
  @ApiPropertyOptional({
    enum: ['ADMIN', 'MANAGER', 'TECHNICIAN'],
    description: 'Filter by role',
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

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
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number;

  @ApiPropertyOptional({
    example: 'john',
    description: 'Search by name, email, or username',
  })
  @IsOptional()
  @IsString()
  search?: string;
}

export class UpdateUserDto {
  @ApiPropertyOptional({
    example: 'John',
    description: 'First name',
  })
  @IsOptional()
  @IsString()
  firstName?: string;

  @ApiPropertyOptional({
    example: 'Doe',
    description: 'Last name',
  })
  @IsOptional()
  @IsString()
  lastName?: string;

  @ApiPropertyOptional({
    example: 'john.doe@example.com',
    description: 'Email address',
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({
    example: 'johndoe',
    description: 'Username (alphanumeric and underscores only, no spaces or special characters)',
    minLength: 3,
    maxLength: 30,
  })
  @IsOptional()
  @IsString()
  @MinLength(3, {
    message: 'Username must be at least 3 characters long',
  })
  @MaxLength(30, {
    message: 'Username must not exceed 30 characters',
  })
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Username can only contain letters (a-z, A-Z), numbers (0-9), and underscores (_). No spaces or special characters allowed.',
  })
  username?: string;

  @ApiPropertyOptional({
    example: '+1234567890',
    description: 'Phone number',
  })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({
    example: '123 Main St',
    description: 'Address',
  })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({
    enum: ['ADMIN', 'MANAGER', 'TECHNICIAN'],
    description: 'User role',
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}

export class ResetUserPasswordDto {
  @ApiProperty({
    example: 'NewSecurePass123',
    description: 'New password (must contain uppercase, lowercase, and number)',
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  newPassword: string;
}
