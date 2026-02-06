import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  Matches,
  IsEnum,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';

export class SignUpDto {
  @ApiProperty({
    description: 'First name of the user',
    example: 'John',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  firstName: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Doe',
    minLength: 2,
    maxLength: 50,
  })
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  lastName: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Username (alphanumeric and underscores only)',
    example: 'johndoe',
    minLength: 3,
    maxLength: 30,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Username can only contain letters, numbers, and underscores',
  })
  username: string;

  @ApiProperty({
    description: 'Password (must contain uppercase, lowercase, and number)',
    example: 'SecurePass123',
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  })
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
    description: 'S3 URL of profile image (after uploading via presigned URL)',
    example: 'https://bucket.s3.region.amazonaws.com/profiles/user123/image.jpg',
  })
  @IsOptional()
  @IsString()
  profileImageUrl?: string;
}

export class SignInDto {
  @ApiProperty({
    description: 'Username',
    example: 'johndoe',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Password',
    example: 'SecurePass123',
  })
  @IsString()
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty({
    description: 'Refresh token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @IsString()
  refreshToken: string;
}

export class RequestPresignedUrlDto {
  @ApiProperty({
    description: 'Name of the file to upload',
    example: 'profile.jpg',
  })
  @IsString()
  fileName: string;

  @ApiProperty({
    description: 'MIME type of the file',
    example: 'image/jpeg',
    enum: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'application/pdf'],
  })
  @IsString()
  contentType: string;

  @ApiProperty({
    description: 'Type of upload',
    enum: ['profile', 'work-order-photo', 'work-order-receipt'],
    example: 'profile',
  })
  @IsEnum(['profile', 'work-order-photo', 'work-order-receipt'])
  uploadType: 'profile' | 'work-order-photo' | 'work-order-receipt';

  @ApiPropertyOptional({
    description: 'Work order ID (required for work-order-photo and work-order-receipt)',
    example: 'wo_1234567890',
  })
  @IsOptional()
  @IsString()
  workOrderId?: string;
}

export class PresignedUrlResponseDto {
  @ApiProperty({
    description: 'Presigned URL for direct S3 upload (PUT request)',
    example: 'https://bucket.s3.region.amazonaws.com/key?X-Amz-Algorithm=...',
  })
  presignedUrl: string;

  @ApiProperty({
    description: 'S3 object key',
    example: 'profiles/user123/1234567890.jpg',
  })
  key: string;

  @ApiProperty({
    description: 'Public URL after upload',
    example: 'https://bucket.s3.region.amazonaws.com/profiles/user123/1234567890.jpg',
  })
  publicUrl: string;

  @ApiProperty({
    description: 'Expiration time in seconds',
    example: 3600,
  })
  expiresIn: number;
}
