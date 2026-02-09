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
exports.EmployeeResponseDto = exports.WhitelistEmailsDto = exports.WhitelistEmailDto = exports.CreateEmployeeDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class CreateEmployeeDto {
    firstName;
    lastName;
    email;
    password;
    phone;
    address;
    role;
    defaultPayRate;
}
exports.CreateEmployeeDto = CreateEmployeeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'First name of the employee',
        example: 'John',
        minLength: 2,
        maxLength: 50,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Last name of the employee',
        example: 'Doe',
        minLength: 2,
        maxLength: 50,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email address (must be unique)',
        example: 'john.doe@example.com',
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Password for the employee account',
        example: 'SecurePass123',
        minLength: 8,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Phone number',
        example: '+1234567890',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Address',
        example: '123 Main St, City, State 12345',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEmployeeDto.prototype, "address", void 0);
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
], CreateEmployeeDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Default pay rate for technician (hourly)',
        example: 25.0,
        minimum: 0,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateEmployeeDto.prototype, "defaultPayRate", void 0);
class WhitelistEmailDto {
    email;
    firstName;
    lastName;
}
exports.WhitelistEmailDto = WhitelistEmailDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Email address to whitelist',
        example: 'employee@example.com',
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], WhitelistEmailDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'First name (optional, can be set during signup)',
        example: 'John',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WhitelistEmailDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Last name (optional, can be set during signup)',
        example: 'Doe',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], WhitelistEmailDto.prototype, "lastName", void 0);
class WhitelistEmailsDto {
    emails;
}
exports.WhitelistEmailsDto = WhitelistEmailsDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of email addresses to whitelist',
        type: [String],
        example: ['employee1@example.com', 'employee2@example.com'],
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEmail)({}, { each: true }),
    __metadata("design:type", Array)
], WhitelistEmailsDto.prototype, "emails", void 0);
class EmployeeResponseDto {
    id;
    firstName;
    lastName;
    email;
    phone;
    address;
    username;
    role;
    whitelisted;
    createdAt;
    updatedAt;
}
exports.EmployeeResponseDto = EmployeeResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'clx1234567890' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Doe' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'john.doe@example.com' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '+1234567890' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '123 Main St' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'johndoe' }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "username", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.UserRole, example: client_1.UserRole.TECHNICIAN }),
    __metadata("design:type", String)
], EmployeeResponseDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], EmployeeResponseDto.prototype, "whitelisted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-02-06T12:00:00Z' }),
    __metadata("design:type", Date)
], EmployeeResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-02-06T12:00:00Z' }),
    __metadata("design:type", Date)
], EmployeeResponseDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=admin.dto.js.map