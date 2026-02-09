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
exports.TimeEntriesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let TimeEntriesService = class TimeEntriesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async checkIn(workOrderId, technicianId, dto) {
        const workOrder = await this.prisma.workOrder.findUnique({
            where: { id: workOrderId },
        });
        if (!workOrder) {
            throw new common_1.NotFoundException('Work order not found');
        }
        if (workOrder.technicianId !== technicianId) {
            throw new common_1.ForbiddenException('Work order is not assigned to you');
        }
        const existingEntry = await this.prisma.timeEntry.findFirst({
            where: {
                workOrderId,
                technicianId,
                checkInAt: { not: null },
                checkOutAt: null,
            },
        });
        if (existingEntry) {
            throw new common_1.BadRequestException('Already checked in. Please check out first.');
        }
        const timeEntry = await this.prisma.timeEntry.create({
            data: {
                workOrderId,
                technicianId,
                checkInAt: new Date(),
                checkInLat: dto.checkInLat,
                checkInLng: dto.checkInLng,
            },
            include: {
                technician: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
        return timeEntry;
    }
    async checkOut(workOrderId, technicianId, dto) {
        const timeEntry = await this.prisma.timeEntry.findFirst({
            where: {
                workOrderId,
                technicianId,
                checkInAt: { not: null },
                checkOutAt: null,
            },
        });
        if (!timeEntry) {
            throw new common_1.NotFoundException('No active check-in found. Please check in first.');
        }
        const checkOutAt = new Date();
        const updated = await this.prisma.timeEntry.update({
            where: { id: timeEntry.id },
            data: {
                checkOutAt,
                checkOutLat: dto.checkOutLat,
                checkOutLng: dto.checkOutLng,
            },
            include: {
                technician: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
        const totalHours = (checkOutAt.getTime() - timeEntry.checkInAt.getTime()) / (1000 * 60 * 60);
        return {
            ...updated,
            totalHours: parseFloat(totalHours.toFixed(2)),
        };
    }
    async findAllForWorkOrder(workOrderId) {
        const workOrder = await this.prisma.workOrder.findUnique({
            where: { id: workOrderId },
        });
        if (!workOrder) {
            throw new common_1.NotFoundException('Work order not found');
        }
        const timeEntries = await this.prisma.timeEntry.findMany({
            where: { workOrderId },
            include: {
                technician: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                edits: {
                    include: {
                        editedBy: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                            },
                        },
                    },
                },
            },
            orderBy: { checkInAt: 'desc' },
        });
        return timeEntries.map((entry) => {
            let totalHours = null;
            if (entry.checkInAt && entry.checkOutAt) {
                totalHours =
                    (entry.checkOutAt.getTime() - entry.checkInAt.getTime()) /
                        (1000 * 60 * 60);
                totalHours = parseFloat(totalHours.toFixed(2));
            }
            return {
                ...entry,
                totalHours,
            };
        });
    }
    async edit(id, dto, adminId) {
        const timeEntry = await this.prisma.timeEntry.findUnique({
            where: { id },
        });
        if (!timeEntry) {
            throw new common_1.NotFoundException('Time entry not found');
        }
        const edits = [];
        if (dto.checkInAt !== undefined) {
            const originalValue = timeEntry.checkInAt
                ? timeEntry.checkInAt.toISOString()
                : null;
            const updatedValue = dto.checkInAt;
            edits.push({
                timeEntryId: id,
                field: 'checkInAt',
                originalValue,
                updatedValue,
                editedById: adminId,
            });
        }
        if (dto.checkOutAt !== undefined) {
            const originalValue = timeEntry.checkOutAt
                ? timeEntry.checkOutAt.toISOString()
                : null;
            const updatedValue = dto.checkOutAt;
            edits.push({
                timeEntryId: id,
                field: 'checkOutAt',
                originalValue,
                updatedValue,
                editedById: adminId,
            });
        }
        const updateData = {};
        if (dto.checkInAt !== undefined) {
            updateData.checkInAt = new Date(dto.checkInAt);
        }
        if (dto.checkOutAt !== undefined) {
            updateData.checkOutAt = new Date(dto.checkOutAt);
        }
        const updated = await this.prisma.timeEntry.update({
            where: { id },
            data: updateData,
            include: {
                technician: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                edits: {
                    include: {
                        editedBy: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                            },
                        },
                    },
                },
            },
        });
        if (edits.length > 0) {
            await this.prisma.timeEntryEdit.createMany({
                data: edits,
            });
            await this.prisma.notification.create({
                data: {
                    userId: timeEntry.technicianId,
                    type: 'TIME_ENTRY_EDITED',
                    channel: 'PUSH',
                    title: 'Time Entry Edited',
                    message: `Your time entry for work order has been edited. Reason: ${dto.reason}`,
                },
            });
        }
        let totalHours = null;
        if (updated.checkInAt && updated.checkOutAt) {
            totalHours =
                (updated.checkOutAt.getTime() - updated.checkInAt.getTime()) /
                    (1000 * 60 * 60);
            totalHours = parseFloat(totalHours.toFixed(2));
        }
        return {
            ...updated,
            totalHours,
            editReason: dto.reason,
        };
    }
};
exports.TimeEntriesService = TimeEntriesService;
exports.TimeEntriesService = TimeEntriesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TimeEntriesService);
//# sourceMappingURL=time-entries.service.js.map