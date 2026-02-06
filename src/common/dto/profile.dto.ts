import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
