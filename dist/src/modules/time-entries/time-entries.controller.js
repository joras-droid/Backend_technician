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
exports.TimeEntriesAdminController = exports.TimeEntriesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const time_entries_service_1 = require("./time-entries.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const client_1 = require("@prisma/client");
const time_entry_dto_1 = require("../../common/dto/time-entry.dto");
let TimeEntriesController = class TimeEntriesController {
    timeEntriesService;
    constructor(timeEntriesService) {
        this.timeEntriesService = timeEntriesService;
    }
    async checkIn(workOrderId, dto, req) {
        return this.timeEntriesService.checkIn(workOrderId, req.user.id, dto);
    }
    async checkOut(workOrderId, dto, req) {
        return this.timeEntriesService.checkOut(workOrderId, req.user.id, req.user.role, dto);
    }
    async findAll(workOrderId) {
        return this.timeEntriesService.findAllForWorkOrder(workOrderId);
    }
};
exports.TimeEntriesController = TimeEntriesController;
__decorate([
    (0, common_1.Post)('check-in'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.TECHNICIAN),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Check in (Technician)',
        description: 'Record check-in time and location for a work order',
    }),
    (0, swagger_1.ApiParam)({
        name: 'workOrderId',
        description: 'Work order ID',
        example: 'clx1234567890',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Check-in recorded successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Already checked in' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Work order not assigned to you' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Work order not found' }),
    __param(0, (0, common_1.Param)('workOrderId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, time_entry_dto_1.CheckInDto, Object]),
    __metadata("design:returntype", Promise)
], TimeEntriesController.prototype, "checkIn", null);
__decorate([
    (0, common_1.Post)('check-out'),
    (0, common_1.UseGuards)(roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.TECHNICIAN, client_1.UserRole.ADMIN, client_1.UserRole.MANAGER),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Check out',
        description: 'Record check-out time and location. Technicians must provide location. Admin/Manager can check out without location (super user).',
    }),
    (0, swagger_1.ApiParam)({
        name: 'workOrderId',
        description: 'Work order ID',
        example: 'clx1234567890',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Check-out recorded successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Not checked in or already checked out' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Work order not assigned to you' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Work order or time entry not found' }),
    __param(0, (0, common_1.Param)('workOrderId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, time_entry_dto_1.CheckOutDto, Object]),
    __metadata("design:returntype", Promise)
], TimeEntriesController.prototype, "checkOut", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Get time entries',
        description: 'Get all time entries for a work order',
    }),
    (0, swagger_1.ApiParam)({
        name: 'workOrderId',
        description: 'Work order ID',
        example: 'clx1234567890',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of time entries',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Work order not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Param)('workOrderId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TimeEntriesController.prototype, "findAll", null);
exports.TimeEntriesController = TimeEntriesController = __decorate([
    (0, swagger_1.ApiTags)('time-entries'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('work-orders/:workOrderId/time-entries'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [time_entries_service_1.TimeEntriesService])
], TimeEntriesController);
let TimeEntriesAdminController = class TimeEntriesAdminController {
    timeEntriesService;
    constructor(timeEntriesService) {
        this.timeEntriesService = timeEntriesService;
    }
    async edit(id, dto, req) {
        return this.timeEntriesService.edit(id, dto, req.user.id);
    }
};
exports.TimeEntriesAdminController = TimeEntriesAdminController;
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Edit time entry (Admin only)',
        description: 'Edit a time entry with audit trail. Technician will be notified.',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Time entry ID',
        example: 'clx3333333333',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Time entry updated successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Validation error' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Admin role required' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Time entry not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, time_entry_dto_1.EditTimeEntryDto, Object]),
    __metadata("design:returntype", Promise)
], TimeEntriesAdminController.prototype, "edit", null);
exports.TimeEntriesAdminController = TimeEntriesAdminController = __decorate([
    (0, swagger_1.ApiTags)('time-entries'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('time-entries'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN),
    __metadata("design:paramtypes", [time_entries_service_1.TimeEntriesService])
], TimeEntriesAdminController);
//# sourceMappingURL=time-entries.controller.js.map