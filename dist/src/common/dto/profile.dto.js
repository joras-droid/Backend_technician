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
exports.UpdateProfileDto = exports.ProfilePresignedUrlRequestDto = exports.ProfileImageUrlDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class ProfileImageUrlDto {
    profileImageUrl;
}
exports.ProfileImageUrlDto = ProfileImageUrlDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'S3 public URL of the uploaded profile image',
        example: 'https://bucket.s3.region.amazonaws.com/profiles/user123/image.jpg',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProfileImageUrlDto.prototype, "profileImageUrl", void 0);
class ProfilePresignedUrlRequestDto {
    fileName;
    contentType;
}
exports.ProfilePresignedUrlRequestDto = ProfilePresignedUrlRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of the file to upload',
        example: 'profile.jpg',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProfilePresignedUrlRequestDto.prototype, "fileName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'MIME type of the file',
        example: 'image/jpeg',
        enum: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'],
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProfilePresignedUrlRequestDto.prototype, "contentType", void 0);
class UpdateProfileDto {
    firstName;
    lastName;
    phone;
    address;
}
exports.UpdateProfileDto = UpdateProfileDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'John',
        description: 'First name',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Doe',
        description: 'Last name',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '+1234567890',
        description: 'Phone number',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '123 Main St',
        description: 'Address',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProfileDto.prototype, "address", void 0);
//# sourceMappingURL=profile.dto.js.map