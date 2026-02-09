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
exports.ClientsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ClientsService = class ClientsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.client.findMany({
            orderBy: { name: 'asc' },
        });
    }
    async findOne(id) {
        const client = await this.prisma.client.findUnique({
            where: { id },
            include: {
                _count: {
                    select: {
                        workOrders: true,
                    },
                },
            },
        });
        if (!client) {
            throw new common_1.NotFoundException('Client not found');
        }
        return {
            ...client,
            workOrdersCount: client._count.workOrders,
        };
    }
    async create(dto) {
        if (dto.email) {
            const existing = await this.prisma.client.findFirst({
                where: { email: dto.email },
            });
            if (existing) {
                throw new common_1.ConflictException('Client with this email already exists');
            }
        }
        return this.prisma.client.create({
            data: {
                name: dto.name,
                email: dto.email,
                phone: dto.phone,
                address: dto.address,
                notes: dto.notes,
            },
        });
    }
    async update(id, dto) {
        const client = await this.prisma.client.findUnique({
            where: { id },
        });
        if (!client) {
            throw new common_1.NotFoundException('Client not found');
        }
        if (dto.email && dto.email !== client.email) {
            const existing = await this.prisma.client.findFirst({
                where: {
                    email: dto.email,
                    id: { not: id },
                },
            });
            if (existing) {
                throw new common_1.ConflictException('Client with this email already exists');
            }
        }
        return this.prisma.client.update({
            where: { id },
            data: {
                name: dto.name,
                email: dto.email,
                phone: dto.phone,
                address: dto.address,
                notes: dto.notes,
            },
        });
    }
    async delete(id) {
        const client = await this.prisma.client.findUnique({
            where: { id },
            include: {
                _count: {
                    select: {
                        workOrders: true,
                    },
                },
            },
        });
        if (!client) {
            throw new common_1.NotFoundException('Client not found');
        }
        if (client._count.workOrders > 0) {
            throw new common_1.BadRequestException('Cannot delete client with associated work orders');
        }
        await this.prisma.client.delete({
            where: { id },
        });
        return {
            message: 'Client deleted successfully',
            id,
        };
    }
};
exports.ClientsService = ClientsService;
exports.ClientsService = ClientsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClientsService);
//# sourceMappingURL=clients.service.js.map