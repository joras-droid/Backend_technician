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
exports.EquipmentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let EquipmentService = class EquipmentService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const existing = await this.prisma.equipment.findUnique({
            where: { name: dto.name },
        });
        if (existing) {
            throw new common_1.ConflictException('Equipment with this name already exists');
        }
        if (dto.minRange !== undefined && dto.maxRange !== undefined) {
            if (dto.minRange > dto.maxRange) {
                throw new common_1.BadRequestException('minRange cannot be greater than maxRange');
            }
        }
        return this.prisma.equipment.create({
            data: {
                name: dto.name,
                description: dto.description,
                price: dto.price,
                minRange: dto.minRange,
                maxRange: dto.maxRange,
                vendor: dto.vendor,
            },
        });
    }
    async findAll() {
        return this.prisma.equipment.findMany({
            where: { isActive: true },
            orderBy: { name: 'asc' },
        });
    }
    async findOne(id) {
        const equipment = await this.prisma.equipment.findUnique({
            where: { id },
        });
        if (!equipment) {
            throw new common_1.NotFoundException('Equipment not found');
        }
        return equipment;
    }
    async update(id, dto) {
        const equipment = await this.prisma.equipment.findUnique({
            where: { id },
        });
        if (!equipment) {
            throw new common_1.NotFoundException('Equipment not found');
        }
        if (dto.name && dto.name !== equipment.name) {
            const existing = await this.prisma.equipment.findUnique({
                where: { name: dto.name },
            });
            if (existing) {
                throw new common_1.ConflictException('Equipment with this name already exists');
            }
        }
        if (dto.minRange !== undefined && dto.maxRange !== undefined) {
            if (dto.minRange > dto.maxRange) {
                throw new common_1.BadRequestException('minRange cannot be greater than maxRange');
            }
        }
        return this.prisma.equipment.update({
            where: { id },
            data: {
                name: dto.name,
                description: dto.description,
                price: dto.price,
                minRange: dto.minRange,
                maxRange: dto.maxRange,
                vendor: dto.vendor,
                isActive: dto.isActive,
            },
        });
    }
    async delete(id) {
        const equipment = await this.prisma.equipment.findUnique({
            where: { id },
        });
        if (!equipment) {
            throw new common_1.NotFoundException('Equipment not found');
        }
        await this.prisma.equipment.delete({
            where: { id },
        });
        return {
            message: 'Equipment deleted successfully',
            id,
        };
    }
    async search(query) {
        const { search, limit = 20 } = query;
        const searchTerm = `%${search}%`;
        const equipment = await this.prisma.equipment.findMany({
            where: {
                isActive: true,
                OR: [
                    { name: { contains: searchTerm, mode: 'insensitive' } },
                    { description: { contains: searchTerm, mode: 'insensitive' } },
                    { vendor: { contains: searchTerm, mode: 'insensitive' } },
                ],
            },
            take: limit,
            orderBy: [
                { name: 'asc' },
            ],
        });
        const sorted = equipment.sort((a, b) => {
            const aNameLower = a.name.toLowerCase();
            const bNameLower = b.name.toLowerCase();
            const searchLower = search.toLowerCase();
            const aExact = aNameLower === searchLower ? 3 : aNameLower.startsWith(searchLower) ? 2 : 1;
            const bExact = bNameLower === searchLower ? 3 : bNameLower.startsWith(searchLower) ? 2 : 1;
            return bExact - aExact;
        });
        return sorted;
    }
    async addCatalogEquipment(workOrderId, dto, technicianId) {
        const workOrder = await this.prisma.workOrder.findUnique({
            where: { id: workOrderId },
        });
        if (!workOrder) {
            throw new common_1.NotFoundException('Work order not found');
        }
        if (workOrder.technicianId !== technicianId) {
            throw new common_1.BadRequestException('Work order is not assigned to you');
        }
        const catalogEquipment = await this.prisma.equipment.findUnique({
            where: { id: dto.equipmentId },
        });
        if (!catalogEquipment) {
            throw new common_1.NotFoundException('Equipment not found in catalog');
        }
        if (!catalogEquipment.isActive) {
            throw new common_1.BadRequestException('Equipment is not active');
        }
        const equipment = await this.prisma.workOrderEquipment.create({
            data: {
                workOrderId,
                equipmentId: dto.equipmentId,
                name: catalogEquipment.name,
                quantity: dto.quantity,
                cost: catalogEquipment.price,
                vendor: catalogEquipment.vendor,
                isCustom: false,
                approvalStatus: client_1.EquipmentApprovalStatus.APPROVED,
            },
            include: {
                workOrder: {
                    select: {
                        workOrderNumber: true,
                    },
                },
                equipment: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                    },
                },
            },
        });
        return equipment;
    }
    async addCustomEquipment(workOrderId, dto, technicianId) {
        const workOrder = await this.prisma.workOrder.findUnique({
            where: { id: workOrderId },
        });
        if (!workOrder) {
            throw new common_1.NotFoundException('Work order not found');
        }
        if (workOrder.technicianId !== technicianId) {
            throw new common_1.BadRequestException('Work order is not assigned to you');
        }
        const equipment = await this.prisma.workOrderEquipment.create({
            data: {
                workOrderId,
                name: dto.name,
                quantity: dto.quantity,
                cost: dto.cost,
                vendor: dto.vendor,
                receiptUrl: dto.receiptUrl,
                isCustom: true,
                addedByTechnicianId: technicianId,
                approvalStatus: client_1.EquipmentApprovalStatus.PENDING,
            },
            include: {
                workOrder: {
                    select: {
                        workOrderNumber: true,
                    },
                },
                addedByTechnician: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
        const adminsAndManagers = await this.prisma.user.findMany({
            where: {
                role: {
                    in: ['ADMIN', 'MANAGER'],
                },
            },
            select: {
                id: true,
            },
        });
        const technicianName = equipment.addedByTechnician
            ? `${equipment.addedByTechnician.firstName} ${equipment.addedByTechnician.lastName}`
            : 'A technician';
        const notifications = adminsAndManagers.map((user) => ({
            userId: user.id,
            type: client_1.NotificationType.EQUIPMENT_APPROVAL_REQUIRED,
            channel: client_1.NotificationChannel.PUSH,
            title: 'Equipment Approval Required',
            message: `${technicianName} added custom equipment "${dto.name}" ($${dto.cost}) to work order ${equipment.workOrder.workOrderNumber}`,
            entityId: equipment.id,
            entityType: 'equipment',
        }));
        await this.prisma.notification.createMany({
            data: notifications,
        });
        return equipment;
    }
    async approveEquipment(equipmentId, dto, approverId) {
        const equipment = await this.prisma.workOrderEquipment.findUnique({
            where: { id: equipmentId },
            include: {
                addedByTechnician: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                workOrder: {
                    select: {
                        workOrderNumber: true,
                    },
                },
            },
        });
        if (!equipment) {
            throw new common_1.NotFoundException('Equipment not found');
        }
        if (!equipment.isCustom) {
            throw new common_1.BadRequestException('Only custom equipment can be approved');
        }
        if (equipment.approvalStatus !== client_1.EquipmentApprovalStatus.PENDING) {
            throw new common_1.BadRequestException('Equipment has already been processed');
        }
        const updated = await this.prisma.workOrderEquipment.update({
            where: { id: equipmentId },
            data: {
                approvalStatus: client_1.EquipmentApprovalStatus.APPROVED,
                approvedById: approverId,
                approvedAt: new Date(),
            },
            include: {
                addedByTechnician: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                approvedBy: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
        await this.prisma.notification.create({
            data: {
                userId: equipment.addedByTechnicianId,
                type: client_1.NotificationType.EQUIPMENT_APPROVED,
                channel: client_1.NotificationChannel.PUSH,
                title: 'Equipment Approved',
                message: `Your custom equipment "${equipment.name}" for work order ${equipment.workOrder.workOrderNumber} has been approved.`,
                entityId: equipment.id,
                entityType: 'equipment',
            },
        });
        return updated;
    }
    async rejectEquipment(equipmentId, dto, approverId) {
        const equipment = await this.prisma.workOrderEquipment.findUnique({
            where: { id: equipmentId },
            include: {
                addedByTechnician: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                workOrder: {
                    select: {
                        workOrderNumber: true,
                    },
                },
            },
        });
        if (!equipment) {
            throw new common_1.NotFoundException('Equipment not found');
        }
        if (!equipment.isCustom) {
            throw new common_1.BadRequestException('Only custom equipment can be rejected');
        }
        if (equipment.approvalStatus !== client_1.EquipmentApprovalStatus.PENDING) {
            throw new common_1.BadRequestException('Equipment has already been processed');
        }
        const updated = await this.prisma.workOrderEquipment.update({
            where: { id: equipmentId },
            data: {
                approvalStatus: client_1.EquipmentApprovalStatus.REJECTED,
                approvedById: approverId,
                approvedAt: new Date(),
                rejectionReason: dto.reason,
            },
            include: {
                addedByTechnician: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
                approvedBy: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
        await this.prisma.notification.create({
            data: {
                userId: equipment.addedByTechnicianId,
                type: client_1.NotificationType.EQUIPMENT_REJECTED,
                channel: client_1.NotificationChannel.PUSH,
                title: 'Equipment Rejected',
                message: `Your custom equipment "${equipment.name}" for work order ${equipment.workOrder.workOrderNumber} has been rejected. Reason: ${dto.reason}`,
                entityId: equipment.id,
                entityType: 'equipment',
            },
        });
        return updated;
    }
    async getPendingApprovals() {
        return this.prisma.workOrderEquipment.findMany({
            where: {
                isCustom: true,
                approvalStatus: client_1.EquipmentApprovalStatus.PENDING,
            },
            include: {
                workOrder: {
                    select: {
                        id: true,
                        workOrderNumber: true,
                        facilityName: true,
                    },
                },
                addedByTechnician: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
};
exports.EquipmentService = EquipmentService;
exports.EquipmentService = EquipmentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EquipmentService);
//# sourceMappingURL=equipment.service.js.map