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
exports.RequestAttachmentPresignedUrlDto = exports.CreateAttachmentDto = exports.UpdateWorkOrderDto = exports.CreateWorkOrderDto = exports.CreateWorkOrderEquipmentDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
class CreateWorkOrderEquipmentDto {
    name;
    quantity;
    cost;
    vendor;
}
exports.CreateWorkOrderEquipmentDto = CreateWorkOrderEquipmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Wrench Set', description: 'Equipment name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWorkOrderEquipmentDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2, description: 'Quantity', minimum: 1 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateWorkOrderEquipmentDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 45.99, description: 'Cost per unit', minimum: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateWorkOrderEquipmentDto.prototype, "cost", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Home Depot', description: 'Vendor name' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWorkOrderEquipmentDto.prototype, "vendor", void 0);
class CreateWorkOrderDto {
    workOrderNumber;
    scheduledAt;
    estimatedHours;
    payRate;
    facilityName;
    facilityAddress;
    pointOfContact;
    tasks;
    notes;
    status;
    clientId;
    technicianId;
    templateId;
    equipment;
}
exports.CreateWorkOrderDto = CreateWorkOrderDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWorkOrderDto.prototype, "workOrderNumber", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateWorkOrderDto.prototype, "scheduledAt", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateWorkOrderDto.prototype, "estimatedHours", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateWorkOrderDto.prototype, "payRate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWorkOrderDto.prototype, "facilityName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWorkOrderDto.prototype, "facilityAddress", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWorkOrderDto.prototype, "pointOfContact", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWorkOrderDto.prototype, "tasks", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWorkOrderDto.prototype, "notes", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.WorkOrderStatus),
    __metadata("design:type", String)
], CreateWorkOrderDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWorkOrderDto.prototype, "clientId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWorkOrderDto.prototype, "technicianId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateWorkOrderDto.prototype, "templateId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateWorkOrderEquipmentDto),
    __metadata("design:type", Array)
], CreateWorkOrderDto.prototype, "equipment", void 0);
class UpdateWorkOrderDto {
    scheduledAt;
    estimatedHours;
    payRate;
    facilityName;
    facilityAddress;
    pointOfContact;
    tasks;
    notes;
    status;
    clientId;
    technicianId;
    invoiceNumber;
}
exports.UpdateWorkOrderDto = UpdateWorkOrderDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateWorkOrderDto.prototype, "scheduledAt", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateWorkOrderDto.prototype, "estimatedHours", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateWorkOrderDto.prototype, "payRate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateWorkOrderDto.prototype, "facilityName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateWorkOrderDto.prototype, "facilityAddress", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateWorkOrderDto.prototype, "pointOfContact", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateWorkOrderDto.prototype, "tasks", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateWorkOrderDto.prototype, "notes", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(client_1.WorkOrderStatus),
    __metadata("design:type", String)
], UpdateWorkOrderDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateWorkOrderDto.prototype, "clientId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateWorkOrderDto.prototype, "technicianId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateWorkOrderDto.prototype, "invoiceNumber", void 0);
class CreateAttachmentDto {
    workOrderId;
    url;
    type;
    description;
}
exports.CreateAttachmentDto = CreateAttachmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'wo_1234567890', description: 'Work order ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAttachmentDto.prototype, "workOrderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'https://bucket.s3.region.amazonaws.com/work-orders/wo123/photo/att_123.jpg',
        description: 'S3 public URL after upload',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAttachmentDto.prototype, "url", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'image/jpeg', description: 'MIME type' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAttachmentDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Work site photo', description: 'Attachment description' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAttachmentDto.prototype, "description", void 0);
class RequestAttachmentPresignedUrlDto {
    workOrderId;
    fileName;
    contentType;
    attachmentType;
    description;
}
exports.RequestAttachmentPresignedUrlDto = RequestAttachmentPresignedUrlDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'wo_1234567890', description: 'Work order ID' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RequestAttachmentPresignedUrlDto.prototype, "workOrderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'photo.jpg', description: 'File name' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RequestAttachmentPresignedUrlDto.prototype, "fileName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'image/jpeg',
        description: 'MIME type',
        enum: ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'application/pdf'],
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RequestAttachmentPresignedUrlDto.prototype, "contentType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: ['photo', 'receipt'],
        example: 'photo',
        description: 'Attachment type',
    }),
    (0, class_validator_1.IsEnum)(['photo', 'receipt']),
    __metadata("design:type", String)
], RequestAttachmentPresignedUrlDto.prototype, "attachmentType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Work site photo', description: 'Optional description' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RequestAttachmentPresignedUrlDto.prototype, "description", void 0);
//# sourceMappingURL=work-order.dto.js.map