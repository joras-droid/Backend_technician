"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("./auth.service");
const s3_service_1 = require("../../common/services/s3.service");
const auth_dto_1 = require("../../common/dto/auth.dto");
const public_decorator_1 = require("./decorators/public.decorator");
const jwt_auth_guard_1 = require("./guards/jwt-auth.guard");
const user_dto_1 = require("../../common/dto/user.dto");
const profile_dto_1 = require("../../common/dto/profile.dto");
const auth_dto_2 = require("../../common/dto/auth.dto");
let AuthController = class AuthController {
    authService;
    s3Service;
    constructor(authService, s3Service) {
        this.authService = authService;
        this.s3Service = s3Service;
    }
    async signUp(signUpDto) {
        return this.authService.signUp(signUpDto);
    }
    async signIn(signInDto) {
        return this.authService.signIn(signInDto);
    }
    async getPresignedUrl(dto) {
        const { fileName, contentType, uploadType } = dto;
        if (!this.s3Service.isValidFileType(contentType)) {
            throw new Error('Invalid file type');
        }
        let key;
        const fileExtension = fileName.split('.').pop() || 'jpg';
        if (uploadType === 'profile') {
            key = this.s3Service.getProfileImageKey('temp', fileExtension);
        }
        else {
            throw new Error('Invalid upload type for auth endpoint');
        }
        const presignedUrl = await this.s3Service.generatePresignedUrl(key, contentType, 3600);
        const publicUrl = this.s3Service.getPublicUrl(key);
        return {
            presignedUrl,
            key,
            publicUrl,
            expiresIn: 3600,
        };
    }
    async getProfilePresignedUrl(req, dto) {
        const { fileName, contentType } = dto;
        if (!this.s3Service.isValidFileType(contentType)) {
            throw new Error('Invalid file type');
        }
        const fileExtension = fileName.split('.').pop() || 'jpg';
        const key = this.s3Service.getProfileImageKey(req.user.id, fileExtension);
        const presignedUrl = await this.s3Service.generatePresignedUrl(key, contentType, 3600);
        const publicUrl = this.s3Service.getPublicUrl(key);
        return {
            presignedUrl,
            key,
            publicUrl,
            expiresIn: 3600,
        };
    }
    async updateProfileImage(req, dto) {
        return this.authService.updateProfileImage(req.user.id, dto.profileImageUrl);
    }
    async refreshToken(dto) {
        return this.authService.refreshToken(dto.refreshToken);
    }
    async requestPasswordReset(dto) {
        return this.authService.requestPasswordReset(dto.email);
    }
    async confirmPasswordReset(dto) {
        return this.authService.confirmPasswordReset(dto.email, dto.otp, dto.newPassword);
    }
    async updateProfile(req, dto) {
        return this.authService.updateProfile(req.user.id, dto);
    }
    async changePassword(req, dto) {
        return this.authService.changePassword(req.user.id, dto.currentPassword, dto.newPassword);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('signup'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new user', description: 'Create a new user account with optional profile image' }),
    (0, swagger_1.ApiResponse)({
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
    }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'User already exists' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Validation error' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.SignUpDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('signin'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Sign in user', description: 'Authenticate user and receive JWT tokens' }),
    (0, swagger_1.ApiResponse)({
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
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Invalid credentials' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.SignInDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('presigned-url'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Get presigned URL for profile image (public)',
        description: 'Get a presigned URL for uploading profile image during signup. Upload file directly to S3 using PUT request.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Presigned URL generated successfully',
        type: auth_dto_1.PresignedUrlResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid file type' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.RequestPresignedUrlDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getPresignedUrl", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('profile/presigned-url'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Get presigned URL for profile image (authenticated)',
        description: 'Get a presigned URL for uploading profile image after signin. Upload file directly to S3 using PUT request.',
    }),
    (0, swagger_1.ApiBody)({ type: profile_dto_1.ProfilePresignedUrlRequestDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Presigned URL generated successfully',
        type: auth_dto_1.PresignedUrlResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, profile_dto_1.ProfilePresignedUrlRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfilePresignedUrl", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('profile/image'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Update profile image URL',
        description: 'Update user profile image URL after uploading to S3',
    }),
    (0, swagger_1.ApiBody)({ type: profile_dto_1.ProfileImageUrlDto }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Profile image updated successfully',
        type: user_dto_1.UserResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, profile_dto_1.ProfileImageUrlDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateProfileImage", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('refresh'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Refresh access token',
        description: 'Get new access and refresh tokens using refresh token',
    }),
    (0, swagger_1.ApiResponse)({
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
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Invalid refresh token' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_2.RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('password-reset/request'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Request password reset (Manager & Technician)',
        description: 'Send OTP code to email for password reset. Only available for manager and technician accounts.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'OTP sent to email (if account exists and is manager/technician)',
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_2.PasswordResetRequestDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "requestPasswordReset", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('password-reset/confirm'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Confirm password reset with OTP',
        description: 'Verify OTP and set new password',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Password reset successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid or expired OTP' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_2.PasswordResetConfirmDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "confirmPasswordReset", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Patch)('profile'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Update profile',
        description: 'Update authenticated user profile',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Profile updated successfully',
        type: user_dto_1.UserResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, profile_dto_1.UpdateProfileDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('change-password'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Change password',
        description: 'Change user password',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Password changed successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized or incorrect current password' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, auth_dto_2.ChangePasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        s3_service_1.S3Service])
], AuthController);
//# sourceMappingURL=auth.controller.js.map