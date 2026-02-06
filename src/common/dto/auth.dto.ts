import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  Matches,
  IsEnum,
} from 'class-validator';
import { UserRole } from '@prisma/client';

export class SignUpDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  @MaxLength(30)
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Username can only contain letters, numbers, and underscores',
  })
  username: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
    message:
      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  })
  password: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  @IsString()
  profileImageUrl?: string; // S3 URL after upload
}

export class SignInDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class RefreshTokenDto {
  @IsString()
  refreshToken: string;
}

export class RequestPresignedUrlDto {
  @IsString()
  fileName: string;

  @IsString()
  contentType: string;

  @IsEnum(['profile', 'work-order-photo', 'work-order-receipt'])
  uploadType: 'profile' | 'work-order-photo' | 'work-order-receipt';

  @IsOptional()
  @IsString()
  workOrderId?: string;
}

export class PresignedUrlResponseDto {
  presignedUrl: string;
  key: string;
  publicUrl: string;
  expiresIn: number;
}
