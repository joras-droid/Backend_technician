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
exports.EditTimeEntryDto = exports.CheckOutDto = exports.CheckInDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CheckInDto {
    checkInLat;
    checkInLng;
}
exports.CheckInDto = CheckInDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 40.7128,
        description: 'GPS latitude',
        minimum: -90,
        maximum: 90,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(-90),
    (0, class_validator_1.Max)(90),
    __metadata("design:type", Number)
], CheckInDto.prototype, "checkInLat", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: -74.0060,
        description: 'GPS longitude',
        minimum: -180,
        maximum: 180,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(-180),
    (0, class_validator_1.Max)(180),
    __metadata("design:type", Number)
], CheckInDto.prototype, "checkInLng", void 0);
class CheckOutDto {
    checkOutLat;
    checkOutLng;
}
exports.CheckOutDto = CheckOutDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 40.7128,
        description: 'GPS latitude (required for Technician; optional for Admin/Manager super user)',
        minimum: -90,
        maximum: 90,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(-90),
    (0, class_validator_1.Max)(90),
    __metadata("design:type", Number)
], CheckOutDto.prototype, "checkOutLat", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: -74.0060,
        description: 'GPS longitude (required for Technician; optional for Admin/Manager super user)',
        minimum: -180,
        maximum: 180,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(-180),
    (0, class_validator_1.Max)(180),
    __metadata("design:type", Number)
], CheckOutDto.prototype, "checkOutLng", void 0);
class EditTimeEntryDto {
    checkInAt;
    checkOutAt;
    reason;
}
exports.EditTimeEntryDto = EditTimeEntryDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2026-02-10T09:00:00.000Z',
        description: 'Updated check-in time (ISO 8601)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], EditTimeEntryDto.prototype, "checkInAt", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2026-02-10T13:00:00.000Z',
        description: 'Updated check-out time (ISO 8601)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], EditTimeEntryDto.prototype, "checkOutAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Corrected time due to system error',
        description: 'Reason for edit (required for audit trail)',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], EditTimeEntryDto.prototype, "reason", void 0);
//# sourceMappingURL=time-entry.dto.js.map