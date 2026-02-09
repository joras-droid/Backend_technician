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
exports.WorkOrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let WorkOrdersService = class WorkOrdersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const { status, technicianId, clientId, scheduledFrom, scheduledTo, workOrderNumber, page = 1, limit = 20, sortBy = 'scheduledAt', sortOrder = 'asc', } = query;
        const where = {};
        if (status) {
            where.status = status;
        }
        if (technicianId) {
            where.technicianId = technicianId;
        }
        if (clientId) {
            where.clientId = clientId;
        }
        if (scheduledFrom || scheduledTo) {
            where.scheduledAt = {};
            if (scheduledFrom) {
                where.scheduledAt.gte = new Date(scheduledFrom);
            }
            if (scheduledTo) {
                where.scheduledAt.lte = new Date(scheduledTo);
            }
        }
        if (workOrderNumber) {
            where.workOrderNumber = {
                contains: workOrderNumber,
                mode: 'insensitive',
            };
        }
        const skip = (page - 1) * limit;
        const take = Math.min(limit, 100);
        const orderBy = {};
        orderBy[sortBy] = sortOrder;
        const total = await this.prisma.workOrder.count({ where });
        const workOrders = await this.prisma.workOrder.findMany({
            where,
            skip,
            take,
            orderBy,
            include: {
                attachments: true,
                equipment: true,
                client: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                    },
                },
                technician: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true,
                        profileImageUrl: true,
                    },
                },
            },
        });
        return {
            data: workOrders,
            pagination: {
                page,
                limit: take,
                total,
                totalPages: Math.ceil(total / take),
            },
        };
    }
    findAllForTechnician(technicianId) {
        return this.prisma.workOrder.findMany({
            where: { technicianId },
            orderBy: [
                { status: 'asc' },
                { scheduledAt: 'asc' },
            ],
            include: {
                attachments: true,
                equipment: true,
                client: true,
                technician: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true,
                    },
                },
            },
        });
    }
    findOne(id) {
        return this.prisma.workOrder.findUnique({
            where: { id },
            include: {
                attachments: true,
                equipment: true,
                client: true,
                technician: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true,
                        profileImageUrl: true,
                    },
                },
                timeEntries: {
                    include: {
                        technician: {
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
    }
    async create(dto, userId) {
        if (dto.technicianId) {
            const technician = await this.prisma.user.findUnique({
                where: { id: dto.technicianId },
            });
            if (!technician) {
                throw new common_1.NotFoundException('Technician not found');
            }
            if (technician.role !== 'TECHNICIAN') {
                throw new common_1.BadRequestException('User is not a technician');
            }
        }
        if (dto.clientId) {
            const client = await this.prisma.client.findUnique({
                where: { id: dto.clientId },
            });
            if (!client) {
                throw new common_1.NotFoundException('Client not found');
            }
        }
        if (dto.templateId) {
            const template = await this.prisma.workOrderTemplate.findUnique({
                where: { id: dto.templateId },
            });
            if (!template) {
                throw new common_1.NotFoundException('Template not found');
            }
        }
        let workOrderNumber = dto.workOrderNumber;
        if (!workOrderNumber) {
            const prefix = process.env.WORK_ORDER_PREFIX || 'WO';
            const year = new Date().getFullYear();
            const count = await this.prisma.workOrder.count({
                where: {
                    workOrderNumber: {
                        startsWith: `${prefix}-${year}-`,
                    },
                },
            });
            workOrderNumber = `${prefix}-${year}-${String(count + 1).padStart(3, '0')}`;
        }
        else {
            const existing = await this.prisma.workOrder.findUnique({
                where: { workOrderNumber },
            });
            if (existing) {
                throw new common_1.ConflictException('Work order number already exists');
            }
        }
        const workOrder = await this.prisma.workOrder.create({
            data: {
                workOrderNumber,
                scheduledAt: new Date(dto.scheduledAt),
                estimatedHours: dto.estimatedHours,
                payRate: dto.payRate,
                facilityName: dto.facilityName,
                facilityAddress: dto.facilityAddress,
                pointOfContact: dto.pointOfContact,
                tasks: dto.tasks,
                notes: dto.notes,
                status: dto.status || client_1.WorkOrderStatus.ACTIVE,
                clientId: dto.clientId,
                technicianId: dto.technicianId,
                templateId: dto.templateId,
                equipment: dto.equipment
                    ? {
                        create: dto.equipment.map((eq) => ({
                            name: eq.name,
                            quantity: eq.quantity,
                            cost: eq.cost,
                            vendor: eq.vendor,
                            equipmentId: eq.equipmentId,
                            isCustom: false,
                            approvalStatus: client_1.EquipmentApprovalStatus.APPROVED,
                        })),
                    }
                    : undefined,
            },
            include: {
                attachments: true,
                equipment: true,
                client: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                    },
                },
                technician: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true,
                        profileImageUrl: true,
                    },
                },
            },
        });
        return workOrder;
    }
    async update(id, dto, userId, userRole) {
        const existing = await this.prisma.workOrder.findUnique({
            where: { id },
        });
        if (!existing) {
            throw new common_1.NotFoundException('Work order not found');
        }
        const currentUser = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { role: true },
        });
        const isTechnician = currentUser?.role === 'TECHNICIAN';
        const isAdminOrManager = currentUser?.role === 'ADMIN' || currentUser?.role === 'MANAGER';
        if (isTechnician && existing.technicianId !== userId) {
            throw new common_1.BadRequestException('Work order is not assigned to you');
        }
        if (isTechnician) {
            const restrictedFields = [
                'scheduledAt',
                'estimatedHours',
                'payRate',
                'facilityName',
                'facilityAddress',
                'pointOfContact',
                'clientId',
                'technicianId',
                'invoiceNumber',
            ];
            for (const field of restrictedFields) {
                if (dto[field] !== undefined) {
                    throw new common_1.BadRequestException(`Technicians cannot update ${field}. Only photos, notes, tasks, and status can be updated.`);
                }
            }
        }
        if (dto.technicianId && isAdminOrManager) {
            const technician = await this.prisma.user.findUnique({
                where: { id: dto.technicianId },
            });
            if (!technician) {
                throw new common_1.NotFoundException('Technician not found');
            }
            if (technician.role !== 'TECHNICIAN') {
                throw new common_1.BadRequestException('User is not a technician');
            }
        }
        if (dto.clientId && isAdminOrManager) {
            const client = await this.prisma.client.findUnique({
                where: { id: dto.clientId },
            });
            if (!client) {
                throw new common_1.NotFoundException('Client not found');
            }
        }
        const updateData = {};
        if (dto.scheduledAt && isAdminOrManager)
            updateData.scheduledAt = new Date(dto.scheduledAt);
        if (dto.estimatedHours !== undefined && isAdminOrManager)
            updateData.estimatedHours = dto.estimatedHours;
        if (dto.payRate !== undefined && isAdminOrManager)
            updateData.payRate = dto.payRate;
        if (dto.facilityName && isAdminOrManager)
            updateData.facilityName = dto.facilityName;
        if (dto.facilityAddress && isAdminOrManager)
            updateData.facilityAddress = dto.facilityAddress;
        if (dto.pointOfContact !== undefined && isAdminOrManager)
            updateData.pointOfContact = dto.pointOfContact;
        if (dto.tasks !== undefined)
            updateData.tasks = dto.tasks;
        if (dto.notes !== undefined)
            updateData.notes = dto.notes;
        if (dto.status)
            updateData.status = dto.status;
        if (dto.clientId !== undefined && isAdminOrManager)
            updateData.clientId = dto.clientId;
        if (dto.technicianId !== undefined && isAdminOrManager)
            updateData.technicianId = dto.technicianId;
        if (dto.invoiceNumber !== undefined && isAdminOrManager)
            updateData.invoiceNumber = dto.invoiceNumber;
        if (dto.beforeWorkPhotos !== undefined)
            updateData.beforeWorkPhotos = dto.beforeWorkPhotos;
        if (dto.afterWorkPhotos !== undefined)
            updateData.afterWorkPhotos = dto.afterWorkPhotos;
        const workOrder = await this.prisma.workOrder.update({
            where: { id },
            data: updateData,
            include: {
                attachments: true,
                equipment: true,
                client: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                    },
                },
                technician: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true,
                        profileImageUrl: true,
                    },
                },
                timeEntries: {
                    include: {
                        technician: {
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
        return workOrder;
    }
    async delete(id, userId) {
        const workOrder = await this.prisma.workOrder.findUnique({
            where: { id },
        });
        if (!workOrder) {
            throw new common_1.NotFoundException('Work order not found');
        }
        await this.prisma.workOrder.delete({
            where: { id },
        });
        return {
            message: 'Work order deleted successfully',
            id,
        };
    }
    async duplicate(id, dto, userId) {
        const original = await this.prisma.workOrder.findUnique({
            where: { id },
            include: {
                equipment: {
                    include: {
                        equipment: true,
                    },
                },
            },
        });
        if (!original) {
            throw new common_1.NotFoundException('Work order not found');
        }
        if (dto.technicianId) {
            const technician = await this.prisma.user.findUnique({
                where: { id: dto.technicianId },
            });
            if (!technician) {
                throw new common_1.NotFoundException('Technician not found');
            }
            if (technician.role !== 'TECHNICIAN') {
                throw new common_1.BadRequestException('User is not a technician');
            }
        }
        const prefix = process.env.WORK_ORDER_PREFIX || 'WO';
        const year = new Date().getFullYear();
        const count = await this.prisma.workOrder.count({
            where: {
                workOrderNumber: {
                    startsWith: `${prefix}-${year}-`,
                },
            },
        });
        const workOrderNumber = `${prefix}-${year}-${String(count + 1).padStart(3, '0')}`;
        const workOrder = await this.prisma.workOrder.create({
            data: {
                workOrderNumber,
                scheduledAt: dto.scheduledAt ? new Date(dto.scheduledAt) : original.scheduledAt,
                estimatedHours: original.estimatedHours,
                payRate: original.payRate,
                facilityName: original.facilityName,
                facilityAddress: original.facilityAddress,
                pointOfContact: original.pointOfContact,
                tasks: original.tasks,
                notes: original.notes,
                status: dto.status || client_1.WorkOrderStatus.ACTIVE,
                clientId: original.clientId,
                technicianId: dto.technicianId || original.technicianId,
                templateId: original.templateId,
                equipment: {
                    create: original.equipment.map((eq) => ({
                        name: eq.name,
                        quantity: eq.quantity,
                        cost: eq.cost || 0,
                        vendor: eq.vendor,
                        equipmentId: eq.equipmentId,
                        isCustom: eq.isCustom || false,
                        approvalStatus: eq.approvalStatus || 'APPROVED',
                        receiptUrl: eq.receiptUrl,
                        addedByTechnicianId: eq.addedByTechnicianId,
                    })),
                },
            },
            include: {
                attachments: true,
                equipment: true,
                client: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                    },
                },
                technician: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true,
                        profileImageUrl: true,
                    },
                },
            },
        });
        return workOrder;
    }
    async createAttachment(workOrderId, dto, userId) {
        const workOrder = await this.prisma.workOrder.findUnique({
            where: { id: workOrderId },
        });
        if (!workOrder) {
            throw new common_1.NotFoundException('Work order not found');
        }
        return this.prisma.attachment.create({
            data: {
                workOrderId,
                url: dto.url,
                type: dto.type,
                description: dto.description,
            },
        });
    }
};
exports.WorkOrdersService = WorkOrdersService;
exports.WorkOrdersService = WorkOrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], WorkOrdersService);
//# sourceMappingURL=work-orders.service.js.map