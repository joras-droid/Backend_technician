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
} from '../../common/dto/profile.dto';

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
}
