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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("./users.service");
const jwt_auth_guard_1 = require("./auth/guards/jwt-auth.guard");
const roles_guard_1 = require("./auth/guards/roles.guard");
const roles_decorator_1 = require("./auth/decorators/roles.decorator");
const client_1 = require("@prisma/client");
const user_management_dto_1 = require("../common/dto/user-management.dto");
let UsersController = class UsersController {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    findAll(query) {
        return this.usersService.findAll(query);
    }
    getTechnicians() {
        return this.usersService.findTechnicians();
    }
    getManagersAndTechnicians() {
        return this.usersService.findManagersAndTechnicians();
    }
    findOne(id) {
        return this.usersService.findOne(id);
    }
    update(id, dto) {
        return this.usersService.update(id, dto);
    }
    resetPassword(id, dto) {
        return this.usersService.resetPassword(id, dto);
    }
    delete(id) {
        return this.usersService.delete(id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'List all users (Admin only)',
        description: 'Get list of all users with optional filters and pagination',
    }),
    (0, swagger_1.ApiQuery)({ name: 'role', required: false, enum: ['ADMIN', 'MANAGER', 'TECHNICIAN'] }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, example: 20 }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, type: String }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Paginated list of users',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Admin role required' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_management_dto_1.ListUsersQueryDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('technicians'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all technicians',
        description: 'Retrieve a list of all users with TECHNICIAN role',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of technicians',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    firstName: { type: 'string' },
                    lastName: { type: 'string' },
                    email: { type: 'string' },
                    role: { type: 'string', enum: ['TECHNICIAN'] },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getTechnicians", null);
__decorate([
    (0, common_1.Get)('managers-and-technicians'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all managers and technicians (Admin only)',
        description: 'Retrieve detailed information about all managers and technicians including work orders and time entries counts',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Managers and technicians with detailed information',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                data: {
                    type: 'object',
                    properties: {
                        managers: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    firstName: { type: 'string' },
                                    lastName: { type: 'string' },
                                    email: { type: 'string' },
                                    username: { type: 'string' },
                                    phone: { type: 'string' },
                                    address: { type: 'string' },
                                    profileImageUrl: { type: 'string' },
                                    role: { type: 'string', enum: ['MANAGER'] },
                                    whitelisted: { type: 'boolean' },
                                    workOrdersCount: { type: 'number' },
                                    timeEntriesCount: { type: 'number' },
                                    createdAt: { type: 'string', format: 'date-time' },
                                    updatedAt: { type: 'string', format: 'date-time' },
                                },
                            },
                        },
                        technicians: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    firstName: { type: 'string' },
                                    lastName: { type: 'string' },
                                    email: { type: 'string' },
                                    username: { type: 'string' },
                                    phone: { type: 'string' },
                                    address: { type: 'string' },
                                    profileImageUrl: { type: 'string' },
                                    role: { type: 'string', enum: ['TECHNICIAN'] },
                                    whitelisted: { type: 'boolean' },
                                    workOrdersCount: { type: 'number' },
                                    timeEntriesCount: { type: 'number' },
                                    createdAt: { type: 'string', format: 'date-time' },
                                    updatedAt: { type: 'string', format: 'date-time' },
                                },
                            },
                        },
                        summary: {
                            type: 'object',
                            properties: {
                                totalManagers: { type: 'number' },
                                totalTechnicians: { type: 'number' },
                                total: { type: 'number' },
                            },
                        },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Admin role required' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getManagersAndTechnicians", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Get user details (Admin only)',
        description: 'Get detailed information about a specific user',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'User ID',
        example: 'clx1234567890',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User details',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Admin role required' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Update user (Admin only)',
        description: 'Update user information',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'User ID',
        example: 'clx1234567890',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User updated successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Validation error' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Admin role required' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Email or username already exists' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_management_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/reset-password'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Reset user password (Admin only)',
        description: 'Reset password for a technician or manager. Cannot reset admin passwords.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'User ID',
        example: 'clx1234567890',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Password reset successfully',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                data: {
                    type: 'object',
                    properties: {
                        message: { type: 'string', example: 'Password reset successfully' },
                        id: { type: 'string', example: 'clx1234567890' },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Cannot reset password for admin users' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Admin role required' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_management_dto_1.ResetUserPasswordDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete user (Admin only)',
        description: 'Delete a user. Cannot delete if user has assigned work orders.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'User ID',
        example: 'clx1234567890',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'User deleted successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'User has assigned work orders' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Admin role required' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "delete", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('users'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map