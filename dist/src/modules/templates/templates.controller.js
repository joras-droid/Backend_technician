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
exports.TemplatesController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const templates_service_1 = require("./templates.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const client_1 = require("@prisma/client");
const template_dto_1 = require("../../common/dto/template.dto");
let TemplatesController = class TemplatesController {
    templatesService;
    constructor(templatesService) {
        this.templatesService = templatesService;
    }
    findAll() {
        return this.templatesService.findAll();
    }
    findOne(id) {
        return this.templatesService.findOne(id);
    }
    create(dto) {
        return this.templatesService.create(dto);
    }
    update(id, dto) {
        return this.templatesService.update(id, dto);
    }
    delete(id) {
        return this.templatesService.delete(id);
    }
};
exports.TemplatesController = TemplatesController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'List all work order templates',
        description: 'Get list of all work order templates',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of templates',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Admin or Manager role required' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TemplatesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Get template details',
        description: 'Get detailed information about a specific template',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Template ID',
        example: 'clx1111111111',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Template details',
    }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Template not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Admin or Manager role required' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TemplatesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({
        summary: 'Create work order template',
        description: 'Create a new reusable work order template',
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Template created successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Validation error' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Admin or Manager role required' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [template_dto_1.CreateWorkOrderTemplateDto]),
    __metadata("design:returntype", void 0)
], TemplatesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Update work order template',
        description: 'Update an existing work order template',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Template ID',
        example: 'clx1111111111',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Template updated successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Validation error' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Admin or Manager role required' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Template not found' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, template_dto_1.UpdateWorkOrderTemplateDto]),
    __metadata("design:returntype", void 0)
], TemplatesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete work order template',
        description: 'Delete a work order template',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Template ID',
        example: 'clx1111111111',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Template deleted successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden - Admin or Manager role required' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Template not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TemplatesController.prototype, "delete", null);
exports.TemplatesController = TemplatesController = __decorate([
    (0, swagger_1.ApiTags)('work-order-templates'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)('work-order-templates'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.UserRole.ADMIN, client_1.UserRole.MANAGER),
    __metadata("design:paramtypes", [templates_service_1.TemplatesService])
], TemplatesController);
//# sourceMappingURL=templates.controller.js.map