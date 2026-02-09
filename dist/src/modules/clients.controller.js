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
exports.ClientsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const clients_service_1 = require("./clients.service");
const jwt_auth_guard_1 = require("./auth/guards/jwt-auth.guard");
const roles_guard_1 = require("./auth/guards/roles.guard");
const roles_decorator_1 = require("./auth/decorators/roles.decorator");
const client_1 = require("@prisma/client");
const client_dto_1 = require("../common/dto/client.dto");
let ClientsController = class ClientsController {
    clientsService;
    constructor(clientsService) {
        this.clientsService = clientsService;
    }
    getAll() {
        return this.clientsService.findAll();
    }
    findOne(id) {
        return this.clientsService.findOne(id);
    }
    create(dto) {
        return this.clientsService.create(dto);
    }
    update(id, dto) {
        return this.clientsService.update(id, dto);
    }
    delete(id) {
        return this.clientsService.delete(id);
    }
};
exports.ClientsController = ClientsController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all clients',
        description: 'Retrieve a list of all clients',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of clients',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    email: { type: 'string' },
                    phone: { type: 'string' },
                    address: { type: 'string' },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Get client details',
        description: 'Get detailed information about a specific client',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Client ID',
        example: 'clx9876543210',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Client details',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Client not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN, client_1.UserRole.MANAGER),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Create client (Admin/Manager)',
        description: 'Create a new client',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Client created successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Validation error' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Admin or Manager role required' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Client with this email already exists' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [client_dto_1.CreateClientDto]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN, client_1.UserRole.MANAGER),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Update client (Admin/Manager)',
        description: 'Update an existing client',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Client ID',
        example: 'clx9876543210',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Client updated successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Validation error' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Admin or Manager role required' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Client not found' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Client with this email already exists' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, client_dto_1.UpdateClientDto]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete client (Admin only)',
        description: 'Delete a client. Cannot delete if client has associated work orders.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Client ID',
        example: 'clx9876543210',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Client deleted successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Client has associated work orders' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Admin role required' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Client not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ClientsController.prototype, "delete", null);
exports.ClientsController = ClientsController = __decorate([
    (0, swagger_1.ApiTags)('clients'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('clients'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [clients_service_1.ClientsService])
], ClientsController);
//# sourceMappingURL=clients.controller.js.map