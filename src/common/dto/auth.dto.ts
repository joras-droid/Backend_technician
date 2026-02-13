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
    description: 'Username (alphanumeric and underscores only, no spaces or special characters)',
    example: 'johndoe',
    minLength: 3,
    maxLength: 30,
  })
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

export class RefreshTokenDto {
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'Refresh token',
  })
  @IsString()
  refreshToken: string;
}

export class PasswordResetRequestDto {
  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;
}

export class PasswordResetConfirmDto {
  @ApiProperty({
    description: 'User email address (same as used in request)',
    example: 'user@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'OTP code received via email (6 digits)',
    example: '123456',
    minLength: 6,
    maxLength: 6,
  })
  @IsString()
  @MinLength(6, { message: 'OTP must be 6 digits' })
  @MaxLength(6, { message: 'OTP must be 6 digits' })
  @Matches(/^\d{6}$/, { message: 'OTP must be exactly 6 digits' })
  otp: string;

  @ApiProperty({
    description: 'New password',
    example: 'NewSecurePass123',
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

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Current password',
    example: 'OldPassword123',
  })
  @IsString()
  currentPassword: string;

  @ApiProperty({
    description: 'New password',
    example: 'NewPassword123',
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

export class SignInDto {
  @ApiProperty({
    description: 'Username or email address',
    example: 'johndoe',
  })
  @IsString()
  username: string; // Can be username or email

  @ApiProperty({
    description: 'Password',
    example: 'SecurePass123',
  })
  @IsString()
  password: string;
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
