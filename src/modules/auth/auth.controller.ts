import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Patch,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { S3Service } from '../../common/services/s3.service';
import {
  SignUpDto,
  SignInDto,
  RequestPresignedUrlDto,
  PresignedUrlResponseDto,
} from '../../common/dto/auth.dto';
import { Public } from './decorators/public.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private s3Service: S3Service,
  ) {}

  @Public()
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Public()
  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Public()
  @Post('presigned-url')
  async getPresignedUrl(
    @Body() dto: RequestPresignedUrlDto,
  ): Promise<PresignedUrlResponseDto> {
    const { fileName, contentType, uploadType } = dto;

    // Validate file type
    if (!this.s3Service.isValidFileType(contentType)) {
      throw new Error('Invalid file type');
    }

    // Generate S3 key based on upload type
    let key: string;
    const fileExtension = fileName.split('.').pop() || 'jpg';

    if (uploadType === 'profile') {
      // For profile, we'll use a temporary ID that will be updated after signup
      key = this.s3Service.getProfileImageKey('temp', fileExtension);
    } else {
      throw new Error('Invalid upload type for auth endpoint');
    }

    // Generate presigned URL (1 hour expiration)
    const presignedUrl = await this.s3Service.generatePresignedUrl(
      key,
      contentType,
      3600,
    );

    const publicUrl = this.s3Service.getPublicUrl(key);

    return {
      presignedUrl,
      key,
      publicUrl,
      expiresIn: 3600,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile/presigned-url')
  async getProfilePresignedUrl(
    @Request() req,
    @Body() dto: { fileName: string; contentType: string },
  ): Promise<PresignedUrlResponseDto> {
    const { fileName, contentType } = dto;

    // Validate file type
    if (!this.s3Service.isValidFileType(contentType)) {
      throw new Error('Invalid file type');
    }

    const fileExtension = fileName.split('.').pop() || 'jpg';
    const key = this.s3Service.getProfileImageKey(req.user.id, fileExtension);

    const presignedUrl = await this.s3Service.generatePresignedUrl(
      key,
      contentType,
      3600,
    );

    const publicUrl = this.s3Service.getPublicUrl(key);

    return {
      presignedUrl,
      key,
      publicUrl,
      expiresIn: 3600,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile/image')
  async updateProfileImage(
    @Request() req,
    @Body() dto: { profileImageUrl: string },
  ) {
    return this.authService.updateProfileImage(
      req.user.id,
      dto.profileImageUrl,
    );
  }
}
