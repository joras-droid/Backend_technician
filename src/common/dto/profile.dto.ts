import {
  IsString,
  IsOptional,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProfileImageUrlDto {
  @ApiProperty({
    description: 'S3 public URL of the uploaded profile image',
    example: 'https://bucket.s3.region.amazonaws.com/profiles/user123/image.jpg',
  })
  @IsString()
  profileImageUrl: string;
}

export class ProfilePresignedUrlRequestDto {
  @ApiProperty({
    description: 'Name of the file to upload',
    example: 'profile.jpg',
  })
  @IsString()
  fileName: string;

  @ApiProperty({
    description: 'MIME type of the file',
    example: 'image/jpeg',
    enum: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'],
  })
  @IsString()
  contentType: string;
}

export class UpdateProfileDto {
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
}
