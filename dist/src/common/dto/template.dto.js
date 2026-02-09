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
exports.UpdateWorkOrderTemplateDto = exports.CreateWorkOrderTemplateDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateWorkOrderTemplateDto {
    name;
    tasks;
    notes;
}
exports.CreateWorkOrderTemplateDto = CreateWorkOrderTemplateDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Standard Installation',
        description: 'Template name',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWorkOrderTemplateDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Install equipment\nTest functionality\nDocument results',
        description: 'Tasks (multiline supported)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWorkOrderTemplateDto.prototype, "tasks", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Standard installation template',
        description: 'Template notes',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWorkOrderTemplateDto.prototype, "notes", void 0);
class UpdateWorkOrderTemplateDto {
    name;
    tasks;
    notes;
}
exports.UpdateWorkOrderTemplateDto = UpdateWorkOrderTemplateDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Standard Installation',
        description: 'Template name',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateWorkOrderTemplateDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Install equipment\nTest functionality\nDocument results',
        description: 'Tasks (multiline supported)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateWorkOrderTemplateDto.prototype, "tasks", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Standard installation template',
        description: 'Template notes',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateWorkOrderTemplateDto.prototype, "notes", void 0);
//# sourceMappingURL=template.dto.js.map