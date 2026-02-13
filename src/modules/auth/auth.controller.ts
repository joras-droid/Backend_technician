import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Patch,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
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
import { AuthenticatedRequest } from '../../common/interfaces/request.interface';
import { UserResponseDto } from '../../common/dto/user.dto';
import {
  ProfileImageUrlDto,
  ProfilePresignedUrlRequestDto,
  UpdateProfileDto,
} from '../../common/dto/profile.dto';
import {
  RefreshTokenDto,
  PasswordResetRequestDto,
  PasswordResetConfirmDto,
  ChangePasswordDto,
} from '../../common/dto/auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private s3Service: S3Service,
  ) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user', description: 'Create a new user account with optional profile image' })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 201 },
        data: {
          type: 'object',
          properties: {
            user: { $ref: '#/components/schemas/UserResponseDto' },
            accessToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
            refreshToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 409, description: 'User already exists' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign in user', description: 'Authenticate user and receive JWT tokens' })
  @ApiResponse({
    status: 200,
    description: 'Successfully authenticated',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 200 },
        data: {
          type: 'object',
          properties: {
            user: { $ref: '#/components/schemas/UserResponseDto' },
            accessToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
            refreshToken: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Public()
  @Post('presigned-url')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get presigned URL for profile image (public)',
    description: 'Get a presigned URL for uploading profile image during signup. Upload file directly to S3 using PUT request.',
  })
  @ApiResponse({
    status: 200,
    description: 'Presigned URL generated successfully',
    type: PresignedUrlResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid file type' })
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
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get presigned URL for profile image (authenticated)',
    description: 'Get a presigned URL for uploading profile image after signin. Upload file directly to S3 using PUT request.',
  })
  @ApiBody({ type: ProfilePresignedUrlRequestDto })
  @ApiResponse({
    status: 200,
    description: 'Presigned URL generated successfully',
    type: PresignedUrlResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProfilePresignedUrl(
    @Request() req: AuthenticatedRequest,
    @Body() dto: ProfilePresignedUrlRequestDto,
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
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update profile image URL',
    description: 'Update user profile image URL after uploading to S3',
  })
  @ApiBody({ type: ProfileImageUrlDto })
  @ApiResponse({
    status: 200,
    description: 'Profile image updated successfully',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateProfileImage(
    @Request() req: AuthenticatedRequest,
    @Body() dto: ProfileImageUrlDto,
  ) {
    return this.authService.updateProfileImage(
      req.user.id,
      dto.profileImageUrl,
    );
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Refresh access token',
    description: 'Get new access and refresh tokens using refresh token',
  })
  @ApiResponse({
    status: 200,
    description: 'Tokens refreshed successfully',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 200 },
        data: {
          type: 'object',
          properties: {
            accessToken: { type: 'string' },
            refreshToken: { type: 'string' },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid refresh token' })
  async refreshToken(@Body() dto: RefreshTokenDto) {
    return this.authService.refreshToken(dto.refreshToken);
  }

  @Public()
  @Post('password-reset/request')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Request password reset (Manager & Technician)',
    description: 'Send OTP code to email for password reset. Only available for manager and technician accounts.',
  })
  @ApiResponse({
    status: 200,
    description: 'OTP sent to email (if account exists and is manager/technician)',
  })
  async requestPasswordReset(@Body() dto: PasswordResetRequestDto) {
    return this.authService.requestPasswordReset(dto.email);
  }

  @Public()
  @Post('password-reset/confirm')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Confirm password reset with OTP',
    description: 'Verify OTP and set new password',
  })
  @ApiResponse({
    status: 200,
    description: 'Password reset successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid or expired OTP' })
  async confirmPasswordReset(@Body() dto: PasswordResetConfirmDto) {
    return this.authService.confirmPasswordReset(dto.email, dto.otp, dto.newPassword);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update profile',
    description: 'Update authenticated user profile',
  })
  @ApiResponse({
    status: 200,
    description: 'Profile updated successfully',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async updateProfile(
    @Request() req: AuthenticatedRequest,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.authService.updateProfile(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Change password',
    description: 'Change user password',
  })
  @ApiResponse({
    status: 200,
    description: 'Password changed successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized or incorrect current password' })
  async changePassword(
    @Request() req: AuthenticatedRequest,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.authService.changePassword(
      req.user.id,
      dto.currentPassword,
      dto.newPassword,
    );
  }
}
