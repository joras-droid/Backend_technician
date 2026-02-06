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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const admin_service_1 = require("./admin.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const client_1 = require("@prisma/client");
const admin_dto_1 = require("../../common/dto/admin.dto");
let AdminController = class AdminController {
    adminService;
    constructor(adminService) {
        this.adminService = adminService;
    }
    async listWhitelistedEmails() {
        return this.adminService.listWhitelistedEmails();
    }
    async whitelistEmail(dto) {
        return this.adminService.whitelistEmail(dto);
    }
    async whitelistEmails(dto) {
        return this.adminService.whitelistEmails(dto);
    }
    async createEmployee(dto) {
        return this.adminService.createEmployee(dto);
    }
    async removeFromWhitelist(email) {
        return this.adminService.removeFromWhitelist(email);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('employees/whitelist'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'List all whitelisted employee emails',
        description: 'Get a list of all whitelisted email addresses and their status',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of whitelisted emails',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    email: { type: 'string', example: 'employee@example.com' },
                    firstName: { type: 'string', example: 'John' },
                    lastName: { type: 'string', example: 'Doe' },
                    username: { type: 'string', example: 'johndoe_123456' },
                    role: { type: 'string', enum: ['ADMIN', 'MANAGER', 'TECHNICIAN'] },
                    accountCreated: { type: 'boolean', example: false },
                    createdAt: { type: 'string', format: 'date-time' },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Admin access required' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "listWhitelistedEmails", null);
__decorate([
    (0, common_1.Post)('employees/whitelist'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Whitelist an email address',
        description: 'Add an email address to the whitelist. User can then signup with this email.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Email whitelisted successfully',
        type: admin_dto_1.EmployeeResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Email already whitelisted' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Admin access required' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.WhitelistEmailDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "whitelistEmail", null);
__decorate([
    (0, common_1.Post)('employees/whitelist/bulk'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Whitelist multiple email addresses',
        description: 'Add multiple email addresses to the whitelist at once',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Emails processed',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    email: { type: 'string' },
                    status: { type: 'string', enum: ['success', 'error'] },
                    data: { type: 'object' },
                    error: { type: 'string' },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Admin access required' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.WhitelistEmailsDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "whitelistEmails", null);
__decorate([
    (0, common_1.Post)('employees'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Create employee account',
        description: 'Create an employee account directly with email, name, and password',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Employee account created successfully',
        type: admin_dto_1.EmployeeResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Employee account already exists' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Admin access required' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.CreateEmployeeDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createEmployee", null);
__decorate([
    (0, common_1.Delete)('employees/whitelist/:email'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Remove email from whitelist',
        description: 'Remove an email address from the whitelist. If account exists, it will be deactivated.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'email',
        description: 'Email address to remove from whitelist',
        example: 'employee@example.com',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Email removed from whitelist',
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string' },
                email: { type: 'string' },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Email not found' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Email is not whitelisted' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Admin access required' }),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "removeFromWhitelist", null);
exports.AdminController = AdminController = __decorate([
    (0, swagger_1.ApiTags)('admin'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('admin'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map