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