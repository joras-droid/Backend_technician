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
exports.ReportsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const reports_service_1 = require("./reports.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const client_1 = require("@prisma/client");
let ReportsController = class ReportsController {
    reportsService;
    constructor(reportsService) {
        this.reportsService = reportsService;
    }
    async getWorkOrderReport(query, req) {
        return this.reportsService.getWorkOrderReport(query, req.user.role);
    }
    async getTimeSummary(query, req) {
        return this.reportsService.getTimeSummary(query, req.user.role);
    }
    async getMetrics(duration, req) {
        const validDurations = ['daily', 'weekly', 'monthly', 'quarterly', 'yearly'];
        const d = validDurations.includes(duration || '') ? duration : 'weekly';
        return this.reportsService.getDashboardMetrics(d, req.user.role);
    }
    async getRecentActivity(limit, req) {
        const l = limit ? parseInt(limit, 10) : 20;
        return this.reportsService.getRecentActivities(isNaN(l) ? 20 : l, req.user.role);
    }
    async exportData(query, res, req) {
        const result = await this.reportsService.exportData(query.type, query, req.user.role);
        res.setHeader('Content-Type', result.contentType);
        res.setHeader('Content-Disposition', `attachment; filename="${result.filename}"`);
        res.send(result.data);
    }
    async getIndividualPerformance(userId, query, req) {
        return this.reportsService.getIndividualPerformance(userId, query, req.user.role);
    }
};
exports.ReportsController = ReportsController;
__decorate([
    (0, common_1.Get)('work-orders'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Work order reports (Admin/Manager)',
        description: 'Generate work order reports with filters',
    }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false, enum: ['ACTIVE', 'COMPLETED', 'PAID'] }),
    (0, swagger_1.ApiQuery)({ name: 'technicianId', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'clientId', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'groupBy', required: false, type: String }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Work order report',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Admin or Manager role required' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getWorkOrderReport", null);
__decorate([
    (0, common_1.Get)('time-summary'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Technician time summary (Admin/Manager)',
        description: 'Get time tracking summary for technicians',
    }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'technicianId', required: false, type: String }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Time summary report',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Admin or Manager role required' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getTimeSummary", null);
__decorate([
    (0, common_1.Get)('metrics'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Dashboard metrics (Admin/Manager)',
        description: 'Get dashboard metrics with optional duration filter (weekly, monthly, etc.)',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'duration',
        required: false,
        enum: ['daily', 'weekly', 'monthly', 'quarterly', 'yearly'],
        description: 'Time period for metrics aggregation',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Dashboard metrics with stat cards, charts, and KPIs',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Admin or Manager role required' }),
    __param(0, (0, common_1.Query)('duration')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getMetrics", null);
__decorate([
    (0, common_1.Get)('recent-activity'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Recent activities (Admin/Manager)',
        description: 'Get recent activities of technicians and managers - work orders, employees, equipment, time entries',
    }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number, description: 'Max items to return (default 20)' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Recent activity feed',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Admin or Manager role required' }),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getRecentActivity", null);
__decorate([
    (0, common_1.Get)('export'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Export data (Admin/Manager)',
        description: 'Export data as CSV file',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'type',
        required: true,
        enum: ['work-orders', 'time-entries', 'clients', 'users', 'individual-performance'],
    }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'format', required: false, enum: ['csv', 'xlsx'], default: 'csv' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'CSV file download',
        content: {
            'text/csv': {
                schema: {
                    type: 'string',
                },
            },
        },
    }),
    (0, swagger_1.ApiQuery)({ name: 'userId', required: false, type: String, description: 'Filter by user ID (for individual export)' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Admin or Manager role required' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "exportData", null);
__decorate([
    (0, common_1.Get)('individual-performance/:userId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Individual performance (Admin/Manager)',
        description: 'Get performance charts, pie charts, and metrics for a specific user. Admin: Manager or Technician. Manager: Technician only.',
    }),
    (0, swagger_1.ApiParam)({ name: 'userId', description: 'User ID (Manager or Technician)' }),
    (0, swagger_1.ApiQuery)({ name: 'startDate', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'endDate', required: false, type: String }),
    (0, swagger_1.ApiQuery)({
        name: 'duration',
        required: false,
        enum: ['daily', 'weekly', 'monthly', 'quarterly', 'yearly'],
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Individual performance with charts and metrics',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Manager cannot view Manager performance' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'User not found' }),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ReportsController.prototype, "getIndividualPerformance", null);
exports.ReportsController = ReportsController = __decorate([
    (0, swagger_1.ApiTags)('reports'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('reports'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN, client_1.UserRole.MANAGER),
    __metadata("design:paramtypes", [reports_service_1.ReportsService])
], ReportsController);
//# sourceMappingURL=reports.controller.js.map