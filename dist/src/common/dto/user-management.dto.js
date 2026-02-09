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
exports.ResetUserPasswordDto = exports.UpdateUserDto = exports.ListUsersQueryDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class ListUsersQueryDto {
    role;
    page;
    limit;
    search;
}
exports.ListUsersQueryDto = ListUsersQueryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: ['ADMIN', 'MANAGER', 'TECHNICIAN'],
        description: 'Filter by role',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.UserRole),
    __metadata("design:type", String)
], ListUsersQueryDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 1,
        description: 'Page number (default: 1)',
        minimum: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ListUsersQueryDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 20,
        description: 'Items per page (default: 20, max: 100)',
        minimum: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], ListUsersQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'john',
        description: 'Search by name, email, or username',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ListUsersQueryDto.prototype, "search", void 0);
class UpdateUserDto {
    firstName;
    lastName;
    email;
    username;
    phone;
    address;
    role;
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'John',
        description: 'First name',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Doe',
        description: 'Last name',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'john.doe@example.com',
        description: 'Email address',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'johndoe',
        description: 'Username (alphanumeric and underscores only, no spaces or special characters)',
        minLength: 3,
        maxLength: 30,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(3, {
        message: 'Username must be at least 3 characters long',
    }),
    (0, class_validator_1.MaxLength)(30, {
        message: 'Username must not exceed 30 characters',
    }),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9_]+$/, {
        message: 'Username can only contain letters (a-z, A-Z), numbers (0-9), and underscores (_). No spaces or special characters allowed.',
    }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '+1234567890',
        description: 'Phone number',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '123 Main St',
        description: 'Address',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: ['ADMIN', 'MANAGER', 'TECHNICIAN'],
        description: 'User role',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.UserRole),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "role", void 0);
class ResetUserPasswordDto {
    newPassword;
}
exports.ResetUserPasswordDto = ResetUserPasswordDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'NewSecurePass123',
        description: 'New password (must contain uppercase, lowercase, and number)',
        minLength: 8,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    }),
    __metadata("design:type", String)
], ResetUserPasswordDto.prototype, "newPassword", void 0);
//# sourceMappingURL=user-management.dto.js.map