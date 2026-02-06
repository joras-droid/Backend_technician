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
const work_order_dto_1 = require("../common/dto/work-order.dto");
const auth_dto_1 = require("../common/dto/auth.dto");
let WorkOrdersController = class WorkOrdersController {
    workOrdersService;
    s3Service;
    constructor(workOrdersService, s3Service) {
        this.workOrdersService = workOrdersService;
        this.s3Service = s3Service;
    }
    getForTechnician(technicianId) {
        return this.workOrdersService.findAllForTechnician(technicianId);
    }
    getOne(id) {
        return this.workOrdersService.findOne(id);
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
    (0, common_1.Get)('technician/:technicianId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get work orders for a technician',
        description: 'Retrieve all work orders assigned to a specific technician',
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
    __param(0, (0, common_1.Param)('technicianId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WorkOrdersController.prototype, "getForTechnician", null);
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