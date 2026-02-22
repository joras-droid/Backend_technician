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
exports.WorkOrdersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const work_orders_service_1 = require("./work-orders.service");
const s3_service_1 = require("../common/services/s3.service");
const jwt_auth_guard_1 = require("../modules/auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../modules/auth/guards/roles.guard");
const roles_decorator_1 = require("../modules/auth/decorators/roles.decorator");
const client_1 = require("@prisma/client");
const work_order_dto_1 = require("../common/dto/work-order.dto");
const auth_dto_1 = require("../common/dto/auth.dto");
let WorkOrdersController = class WorkOrdersController {
    workOrdersService;
    s3Service;
    constructor(workOrdersService, s3Service) {
        this.workOrdersService = workOrdersService;
        this.s3Service = s3Service;
    }
    async getAllWorkOrders(query) {
        return this.workOrdersService.findAll(query);
    }
    getMyWorkOrders(req) {
        return this.workOrdersService.findAllForTechnician(req.user.id);
    }
    getForTechnician(technicianId) {
        return this.workOrdersService.findAllForTechnician(technicianId);
    }
    async create(dto, req) {
        return this.workOrdersService.create(dto, req.user.id);
    }
    async update(id, dto, req) {
        return this.workOrdersService.update(id, dto, req.user.id, req.user.role);
    }
    async duplicate(id, dto, req) {
        return this.workOrdersService.duplicate(id, dto, req.user.id);
    }
    getOne(id) {
        return this.workOrdersService.findOne(id);
    }
    async delete(id, req) {
        return this.workOrdersService.delete(id, req.user.id);
    }
    async getAttachmentPresignedUrl(workOrderId, dto) {
        const { fileName, contentType, attachmentType, description } = dto;
        if (!this.s3Service.isValidFileType(contentType)) {
            throw new Error('Invalid file type');
        }
        const attachmentId = `att_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const fileExtension = fileName.split('.').pop() || 'jpg';
        const key = this.s3Service.getWorkOrderAttachmentKey(workOrderId, attachmentId, fileExtension, attachmentType);
        const presignedUrl = await this.s3Service.generatePresignedUrl(key, contentType, 3600);
        const publicUrl = this.s3Service.getPublicUrl(key);
        return {
            presignedUrl,
            key,
            publicUrl,
            expiresIn: 3600,
        };
    }
    async createAttachment(workOrderId, dto, req) {
        return this.workOrdersService.createAttachment(workOrderId, dto, req.user.id);
    }
};
exports.WorkOrdersController = WorkOrdersController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN, client_1.UserRole.MANAGER),
    (0, swagger_1.ApiOperation)({
        summary: 'List all work orders (Admin/Manager)',
        description: 'Retrieve all work orders with optional filters, pagination, and sorting. Available to ADMIN and MANAGER roles only.',
    }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: ['ACTIVE', 'COMPLETED', 'PAID'] }),
    (0, swagger_1.ApiQuery)({ name: 'technicianId', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'clientId', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'scheduledFrom', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'scheduledTo', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'workOrderNumber', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, example: 20 }),
    (0, swagger_1.ApiQuery)({
        name: 'sortBy',
        required: false,
        enum: ['scheduledAt', 'createdAt', 'updatedAt', 'workOrderNumber', 'status'],
    }),
    (0, swagger_1.ApiQuery)({ name: 'sortOrder', required: false, enum: ['asc', 'desc'] }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Paginated list of work orders',
        schema: {
            type: 'object',
            properties: {
                statusCode: { type: 'number', example: 200 },
                data: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'array',
                            items: { type: 'object' },
                        },
                        pagination: {
                            type: 'object',
                            properties: {
                                page: { type: 'number', example: 1 },
                                limit: { type: 'number', example: 20 },
                                total: { type: 'number', example: 100 },
                                totalPages: { type: 'number', example: 5 },
                            },
                        },
                    },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Admin or Manager role required' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [work_order_dto_1.ListWorkOrdersQueryDto]),
    __metadata("design:returntype", Promise)
], WorkOrdersController.prototype, "getAllWorkOrders", null);
__decorate([
    (0, common_1.Get)('technician'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.TECHNICIAN),
    (0, swagger_1.ApiOperation)({
        summary: 'Get my work orders (Technician only)',
        description: 'Retrieve all work orders assigned to the authenticated technician. Active work orders are prioritized. This endpoint is only available to TECHNICIAN role.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of work orders',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    workOrderNumber: { type: 'string' },
                    scheduledAt: { type: 'string', format: 'date-time' },
                    status: { type: 'string', enum: ['ACTIVE', 'COMPLETED', 'PAID'] },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Technician role required' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WorkOrdersController.prototype, "getMyWorkOrders", null);
__decorate([
    (0, common_1.Get)('technician/:technicianId'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN, client_1.UserRole.MANAGER),
    (0, swagger_1.ApiOperation)({
        summary: 'Get work orders for a technician (Admin/Manager)',
        description: 'Retrieve all work orders assigned to a specific technician. Requires admin or manager role.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'technicianId',
        description: 'Technician user ID',
        example: 'clx1234567890',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of work orders',
        schema: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    workOrderNumber: { type: 'string' },
                    scheduledAt: { type: 'string', format: 'date-time' },
                    status: { type: 'string', enum: ['ACTIVE', 'COMPLETED', 'PAID'] },
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Admin or Manager role required' }),
    __param(0, (0, common_1.Param)('technicianId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WorkOrdersController.prototype, "getForTechnician", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN, client_1.UserRole.MANAGER),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Create work order (Admin/Manager)',
        description: 'Create a new work order and assign it to a technician',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Work order created successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Validation error' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Admin or Manager role required' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Client or technician not found' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Work order number already exists' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [work_order_dto_1.CreateWorkOrderDto, Object]),
    __metadata("design:returntype", Promise)
], WorkOrdersController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN, client_1.UserRole.MANAGER, client_1.UserRole.TECHNICIAN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Update work order',
        description: 'Update an existing work order. Technicians can update photos, notes, tasks, and status. Admin/Manager can update all fields.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Work order ID',
        example: 'clx1234567890',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Work order updated successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Validation error' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Admin or Manager role required' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Work order not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, work_order_dto_1.UpdateWorkOrderDto, Object]),
    __metadata("design:returntype", Promise)
], WorkOrdersController.prototype, "update", null);
__decorate([
    (0, common_1.Post)(':id/duplicate'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN, client_1.UserRole.MANAGER),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Duplicate work order (Admin/Manager)',
        description: 'Create a duplicate of an existing work order with optional modifications',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Work order ID to duplicate',
        example: 'clx1234567890',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Work order duplicated successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Validation error' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Admin or Manager role required' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Work order not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, work_order_dto_1.DuplicateWorkOrderDto, Object]),
    __metadata("design:returntype", Promise)
], WorkOrdersController.prototype, "duplicate", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get work order details',
        description: 'Retrieve detailed information about a specific work order including attachments, equipment, and time entries',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Work order ID',
        example: 'clx1234567890',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Work order details',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Work order not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WorkOrdersController.prototype, "getOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete work order (Admin only)',
        description: 'Delete a work order. Only admins can delete work orders.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Work order ID',
        example: 'clx1234567890',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Work order deleted successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Admin role required' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Work order not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], WorkOrdersController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)(':workOrderId/attachments/presigned-url'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Get presigned URL for work order attachment',
        description: 'Get a presigned URL for uploading photos or receipts to a work order. Upload file directly to S3 using PUT request.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'workOrderId',
        description: 'Work order ID',
        example: 'clx1234567890',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Presigned URL generated successfully',
        type: auth_dto_1.PresignedUrlResponseDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid file type' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Param)('workOrderId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], WorkOrdersController.prototype, "getAttachmentPresignedUrl", null);
__decorate([
    (0, common_1.Post)(':workOrderId/attachments'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Create attachment record',
        description: 'Create an attachment record after uploading file to S3 using presigned URL',
    }),
    (0, swagger_1.ApiParam)({
        name: 'workOrderId',
        description: 'Work order ID',
        example: 'clx1234567890',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Attachment created successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Work order not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Param)('workOrderId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, work_order_dto_1.CreateAttachmentDto, Object]),
    __metadata("design:returntype", Promise)
], WorkOrdersController.prototype, "createAttachment", null);
exports.WorkOrdersController = WorkOrdersController = __decorate([
    (0, swagger_1.ApiTags)('work-orders'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('work-orders'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [work_orders_service_1.WorkOrdersService,
        s3_service_1.S3Service])
], WorkOrdersController);
//# sourceMappingURL=work-orders.controller.js.map