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
exports.RejectEquipmentDto = exports.ApproveEquipmentDto = exports.AddCustomEquipmentDto = exports.AddCatalogEquipmentDto = exports.SearchEquipmentQueryDto = exports.UpdateEquipmentDto = exports.CreateEquipmentDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class CreateEquipmentDto {
    name;
    description;
    price;
    minRange;
    maxRange;
    vendor;
}
exports.CreateEquipmentDto = CreateEquipmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Wrench Set',
        description: 'Equipment name (must be unique)',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEquipmentDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Professional grade wrench set',
        description: 'Equipment description',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEquipmentDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 45.99,
        description: 'Price (mandatory)',
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateEquipmentDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 40.0,
        description: 'Minimum price range (optional)',
        minimum: 0,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateEquipmentDto.prototype, "minRange", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 50.0,
        description: 'Maximum price range (optional)',
        minimum: 0,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateEquipmentDto.prototype, "maxRange", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Home Depot',
        description: 'Vendor name',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateEquipmentDto.prototype, "vendor", void 0);
class UpdateEquipmentDto {
    name;
    description;
    price;
    minRange;
    maxRange;
    vendor;
    isActive;
}
exports.UpdateEquipmentDto = UpdateEquipmentDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Wrench Set',
        description: 'Equipment name',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEquipmentDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Professional grade wrench set',
        description: 'Equipment description',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEquipmentDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 45.99,
        description: 'Price',
        minimum: 0,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateEquipmentDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 40.0,
        description: 'Minimum price range',
        minimum: 0,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateEquipmentDto.prototype, "minRange", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 50.0,
        description: 'Maximum price range',
        minimum: 0,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateEquipmentDto.prototype, "maxRange", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Home Depot',
        description: 'Vendor name',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateEquipmentDto.prototype, "vendor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: true,
        description: 'Is equipment active',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], UpdateEquipmentDto.prototype, "isActive", void 0);
class SearchEquipmentQueryDto {
    search;
    limit;
}
exports.SearchEquipmentQueryDto = SearchEquipmentQueryDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'wrench',
        description: 'Search term for equipment name or description (fuzzy search)',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchEquipmentQueryDto.prototype, "search", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 20,
        description: 'Maximum number of results (default: 20, max: 100)',
        minimum: 1,
        maximum: 100,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], SearchEquipmentQueryDto.prototype, "limit", void 0);
class AddCatalogEquipmentDto {
    equipmentId;
    quantity;
}
exports.AddCatalogEquipmentDto = AddCatalogEquipmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'clx1111111111',
        description: 'Equipment ID from catalog',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddCatalogEquipmentDto.prototype, "equipmentId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 2,
        description: 'Quantity',
        minimum: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], AddCatalogEquipmentDto.prototype, "quantity", void 0);
class AddCustomEquipmentDto {
    name;
    quantity;
    cost;
    vendor;
    receiptUrl;
}
exports.AddCustomEquipmentDto = AddCustomEquipmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Custom Tool XYZ',
        description: 'Equipment name',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddCustomEquipmentDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 2,
        description: 'Quantity',
        minimum: 1,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], AddCustomEquipmentDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 75.50,
        description: 'Cost per unit (mandatory)',
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], AddCustomEquipmentDto.prototype, "cost", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Local Hardware Store',
        description: 'Vendor name',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddCustomEquipmentDto.prototype, "vendor", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'https://bucket.s3.region.amazonaws.com/receipts/receipt123.jpg',
        description: 'Receipt URL (optional, upload via presigned URL first)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddCustomEquipmentDto.prototype, "receiptUrl", void 0);
class ApproveEquipmentDto {
    note;
}
exports.ApproveEquipmentDto = ApproveEquipmentDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Approved for reimbursement',
        description: 'Approval note (optional)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ApproveEquipmentDto.prototype, "note", void 0);
class RejectEquipmentDto {
    reason;
}
exports.RejectEquipmentDto = RejectEquipmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Receipt not provided',
        description: 'Reason for rejection (required)',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RejectEquipmentDto.prototype, "reason", void 0);
//# sourceMappingURL=equipment.dto.js.map