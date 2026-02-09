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
exports.WorkOrderEquipmentController = exports.EquipmentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const equipment_service_1 = require("./equipment.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const client_1 = require("@prisma/client");
const equipment_dto_1 = require("../../common/dto/equipment.dto");
let EquipmentController = class EquipmentController {
    equipmentService;
    constructor(equipmentService) {
        this.equipmentService = equipmentService;
    }
    findAll() {
        return this.equipmentService.findAll();
    }
    search(query) {
        return this.equipmentService.search(query);
    }
    getPendingApprovals() {
        return this.equipmentService.getPendingApprovals();
    }
    findOne(id) {
        return this.equipmentService.findOne(id);
    }
    create(dto) {
        return this.equipmentService.create(dto);
    }
    update(id, dto) {
        return this.equipmentService.update(id, dto);
    }
    delete(id) {
        return this.equipmentService.delete(id);
    }
    approve(id, dto, req) {
        return this.equipmentService.approveEquipment(id, dto, req.user.id);
    }
    reject(id, dto, req) {
        return this.equipmentService.rejectEquipment(id, dto, req.user.id);
    }
};
exports.EquipmentController = EquipmentController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN, client_1.UserRole.TECHNICIAN, client_1.UserRole.MANAGER),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'List all equipment',
        description: 'Get list of all active equipment in the catalog. Available to Admin, Manager, and Technician.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of equipment',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Admin, Manager, or Technician role required' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EquipmentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.TECHNICIAN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Search equipment (Technician only)',
        description: 'Search equipment using fuzzy logic. Searches by name, description, and vendor.',
    }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: true, type: String, description: 'Search term' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, example: 20 }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of matching equipment',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Technician role required' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [equipment_dto_1.SearchEquipmentQueryDto]),
    __metadata("design:returntype", void 0)
], EquipmentController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('pending-approvals'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN, client_1.UserRole.MANAGER),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Get pending equipment approvals (Admin/Manager)',
        description: 'Get all custom equipment waiting for approval',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of pending equipment approvals',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Admin or Manager role required' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EquipmentController.prototype, "getPendingApprovals", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN, client_1.UserRole.TECHNICIAN, client_1.UserRole.MANAGER),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Get equipment details',
        description: 'Get detailed information about a specific equipment. Available to Admin, Manager, and Technician.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Equipment ID',
        example: 'clx1111111111',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Equipment details',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Equipment not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Admin, Manager, or Technician role required' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EquipmentController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Create equipment (Admin only)',
        description: 'Add new equipment to the catalog with price (mandatory) and optional price range',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Equipment created successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Validation error' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Admin role required' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Equipment name already exists' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [equipment_dto_1.CreateEquipmentDto]),
    __metadata("design:returntype", void 0)
], EquipmentController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Update equipment (Admin only)',
        description: 'Update equipment information',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Equipment ID',
        example: 'clx1111111111',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Equipment updated successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Validation error' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Admin role required' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Equipment not found' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Equipment name already exists' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, equipment_dto_1.UpdateEquipmentDto]),
    __metadata("design:returntype", void 0)
], EquipmentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete equipment (Admin only)',
        description: 'Delete equipment from catalog',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Equipment ID',
        example: 'clx1111111111',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Equipment deleted successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Admin role required' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Equipment not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EquipmentController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)(':id/approve'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN, client_1.UserRole.MANAGER),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Approve custom equipment (Admin/Manager)',
        description: 'Approve custom equipment. Approved equipment cost will be included in total cost calculations.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Equipment ID',
        example: 'clx2222222222',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Equipment approved successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Equipment already processed or not custom' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Admin or Manager role required' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Equipment not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, equipment_dto_1.ApproveEquipmentDto, Object]),
    __metadata("design:returntype", void 0)
], EquipmentController.prototype, "approve", null);
__decorate([
    (0, common_1.Post)(':id/reject'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN, client_1.UserRole.MANAGER),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Reject custom equipment (Admin/Manager)',
        description: 'Reject custom equipment. Rejected equipment cost will NOT be included in total cost calculations.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Equipment ID',
        example: 'clx2222222222',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Equipment rejected successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Equipment already processed or not custom' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Admin or Manager role required' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Equipment not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, equipment_dto_1.RejectEquipmentDto, Object]),
    __metadata("design:returntype", void 0)
], EquipmentController.prototype, "reject", null);
exports.EquipmentController = EquipmentController = __decorate([
    (0, swagger_1.ApiTags)('equipment'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('equipment'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [equipment_service_1.EquipmentService])
], EquipmentController);
let WorkOrderEquipmentController = class WorkOrderEquipmentController {
    equipmentService;
    constructor(equipmentService) {
        this.equipmentService = equipmentService;
    }
    addCatalogEquipment(workOrderId, dto, req) {
        return this.equipmentService.addCatalogEquipment(workOrderId, dto, req.user.id);
    }
    addCustomEquipment(workOrderId, dto, req) {
        return this.equipmentService.addCustomEquipment(workOrderId, dto, req.user.id);
    }
};
exports.WorkOrderEquipmentController = WorkOrderEquipmentController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.TECHNICIAN),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Add catalog equipment to work order (Technician only)',
        description: 'Add equipment from the catalog to a work order. Equipment is pre-approved and cost is immediately included in totals.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'workOrderId',
        description: 'Work order ID',
        example: 'clx1234567890',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Catalog equipment added successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Work order not assigned to you or equipment not active' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Technician role required' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Work order or equipment not found' }),
    __param(0, (0, common_1.Param)('workOrderId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, equipment_dto_1.AddCatalogEquipmentDto, Object]),
    __metadata("design:returntype", void 0)
], WorkOrderEquipmentController.prototype, "addCatalogEquipment", null);
__decorate([
    (0, common_1.Post)('custom'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.TECHNICIAN),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Add custom equipment (Technician only)',
        description: 'Add custom equipment to a work order. Requires approval from admin/manager. Creates notifications.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'workOrderId',
        description: 'Work order ID',
        example: 'clx1234567890',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Custom equipment added successfully (pending approval)',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Work order not assigned to you' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Technician role required' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Work order not found' }),
    __param(0, (0, common_1.Param)('workOrderId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, equipment_dto_1.AddCustomEquipmentDto, Object]),
    __metadata("design:returntype", void 0)
], WorkOrderEquipmentController.prototype, "addCustomEquipment", null);
exports.WorkOrderEquipmentController = WorkOrderEquipmentController = __decorate([
    (0, swagger_1.ApiTags)('work-orders'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('work-orders/:workOrderId/equipment'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [equipment_service_1.EquipmentService])
], WorkOrderEquipmentController);
//# sourceMappingURL=equipment.controller.js.map