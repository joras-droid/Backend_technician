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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresignedUrlResponseDto = exports.RequestPresignedUrlDto = exports.RefreshTokenDto = exports.SignInDto = exports.SignUpDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class SignUpDto {
    firstName;
    lastName;
    email;
    username;
    password;
    phone;
    address;
    role;
    profileImageUrl;
}
exports.SignUpDto = SignUpDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'First name of the user',
        example: 'John',
        minLength: 2,
        maxLength: 50,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], SignUpDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Last name of the user',
        example: 'Doe',
        minLength: 2,
        maxLength: 50,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], SignUpDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email address of the user',
        example: 'john.doe@example.com',
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], SignUpDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Username (alphanumeric and underscores only)',
        example: 'johndoe',
        minLength: 3,
        maxLength: 30,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(30),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9_]+$/, {
        message: 'Username can only contain letters, numbers, and underscores',
    }),
    __metadata("design:type", String)
], SignUpDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Password (must contain uppercase, lowercase, and number)',
        example: 'SecurePass123',
        minLength: 8,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    }),
    __metadata("design:type", String)
], SignUpDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Phone number',
        example: '+1234567890',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignUpDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Address',
        example: '123 Main St, City, State 12345',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignUpDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'User role',
        enum: client_1.UserRole,
        example: client_1.UserRole.TECHNICIAN,
        default: client_1.UserRole.TECHNICIAN,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.UserRole),
    __metadata("design:type", String)
], SignUpDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'S3 URL of profile image (after uploading via presigned URL)',
        example: 'https://bucket.s3.region.amazonaws.com/profiles/user123/image.jpg',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignUpDto.prototype, "profileImageUrl", void 0);
class SignInDto {
    username;
    password;
}
exports.SignInDto = SignInDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Username',
        example: 'johndoe',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignInDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Password',
        example: 'SecurePass123',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SignInDto.prototype, "password", void 0);
class RefreshTokenDto {
    refreshToken;
}
exports.RefreshTokenDto = RefreshTokenDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Refresh token',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RefreshTokenDto.prototype, "refreshToken", void 0);
class RequestPresignedUrlDto {
    fileName;
    contentType;
    uploadType;
    workOrderId;
}
exports.RequestPresignedUrlDto = RequestPresignedUrlDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the file to upload',
        example: 'profile.jpg',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RequestPresignedUrlDto.prototype, "fileName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'MIME type of the file',
        example: 'image/jpeg',
        enum: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'application/pdf'],
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RequestPresignedUrlDto.prototype, "contentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of upload',
        enum: ['profile', 'work-order-photo', 'work-order-receipt'],
        example: 'profile',
    }),
    (0, class_validator_1.IsEnum)(['profile', 'work-order-photo', 'work-order-receipt']),
    __metadata("design:type", String)
], RequestPresignedUrlDto.prototype, "uploadType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Work order ID (required for work-order-photo and work-order-receipt)',
        example: 'wo_1234567890',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RequestPresignedUrlDto.prototype, "workOrderId", void 0);
class PresignedUrlResponseDto {
    presignedUrl;
    key;
    publicUrl;
    expiresIn;
}
exports.PresignedUrlResponseDto = PresignedUrlResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Presigned URL for direct S3 upload (PUT request)',
        example: 'https://bucket.s3.region.amazonaws.com/key?X-Amz-Algorithm=...',
    }),
    __metadata("design:type", String)
], PresignedUrlResponseDto.prototype, "presignedUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'S3 object key',
        example: 'profiles/user123/1234567890.jpg',
    }),
    __metadata("design:type", String)
], PresignedUrlResponseDto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Public URL after upload',
        example: 'https://bucket.s3.region.amazonaws.com/profiles/user123/1234567890.jpg',
    }),
    __metadata("design:type", String)
], PresignedUrlResponseDto.prototype, "publicUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Expiration time in seconds',
        example: 3600,
    }),
    __metadata("design:type", Number)
], PresignedUrlResponseDto.prototype, "expiresIn", void 0);
//# sourceMappingURL=auth.dto.js.map