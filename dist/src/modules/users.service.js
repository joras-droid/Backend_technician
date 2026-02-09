"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const bcrypt = __importStar(require("bcrypt"));
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let UsersService = class UsersService {
    prisma;
    configService;
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
    }
    findTechnicians() {
        return this.prisma.user.findMany({
            where: { role: 'TECHNICIAN' },
            orderBy: { lastName: 'asc' },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                username: true,
                phone: true,
                address: true,
                profileImageUrl: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
    async findAll(query) {
        const { role, page = 1, limit = 20, search, } = query;
        const where = {};
        if (role) {
            where.role = role;
        }
        if (search) {
            where.OR = [
                { firstName: { contains: search, mode: 'insensitive' } },
                { lastName: { contains: search, mode: 'insensitive' } },
                { email: { contains: search, mode: 'insensitive' } },
                { username: { contains: search, mode: 'insensitive' } },
            ];
        }
        const skip = (page - 1) * limit;
        const take = Math.min(limit, 100);
        const total = await this.prisma.user.count({ where });
        const users = await this.prisma.user.findMany({
            where,
            skip,
            take,
            orderBy: { lastName: 'asc' },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                username: true,
                phone: true,
                address: true,
                profileImageUrl: true,
                role: true,
                whitelisted: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return {
            data: users,
            pagination: {
                page,
                limit: take,
                total,
                totalPages: Math.ceil(total / take),
            },
        };
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                username: true,
                phone: true,
                address: true,
                profileImageUrl: true,
                role: true,
                whitelisted: true,
                createdAt: true,
                updatedAt: true,
                _count: {
                    select: {
                        workOrdersAssigned: true,
                    },
                },
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return {
            ...user,
            workOrdersCount: user._count.workOrdersAssigned,
        };
    }
    async update(id, dto) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (dto.email && dto.email !== user.email) {
            const existing = await this.prisma.user.findUnique({
                where: { email: dto.email },
            });
            if (existing) {
                throw new common_1.ConflictException('Email already exists');
            }
        }
        if (dto.username && dto.username !== user.username) {
            if (!/^[a-zA-Z0-9_]+$/.test(dto.username)) {
                throw new common_1.ConflictException('Username can only contain letters, numbers, and underscores. No spaces or special characters allowed.');
            }
            const existing = await this.prisma.user.findUnique({
                where: { username: dto.username },
            });
            if (existing) {
                throw new common_1.ConflictException('Username is already taken. Please choose a different username.');
            }
        }
        const updateData = {};
        if (dto.firstName !== undefined)
            updateData.firstName = dto.firstName;
        if (dto.lastName !== undefined)
            updateData.lastName = dto.lastName;
        if (dto.email !== undefined)
            updateData.email = dto.email;
        if (dto.username !== undefined)
            updateData.username = dto.username;
        if (dto.phone !== undefined)
            updateData.phone = dto.phone;
        if (dto.address !== undefined)
            updateData.address = dto.address;
        if (dto.role !== undefined)
            updateData.role = dto.role;
        return this.prisma.user.update({
            where: { id },
            data: updateData,
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                username: true,
                phone: true,
                address: true,
                profileImageUrl: true,
                role: true,
                whitelisted: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
    async findManagersAndTechnicians() {
        const users = await this.prisma.user.findMany({
            where: {
                role: {
                    in: [client_1.UserRole.MANAGER, client_1.UserRole.TECHNICIAN],
                },
            },
            orderBy: [
                { role: 'asc' },
                { lastName: 'asc' },
            ],
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                username: true,
                phone: true,
                address: true,
                profileImageUrl: true,
                role: true,
                whitelisted: true,
                createdAt: true,
                updatedAt: true,
                _count: {
                    select: {
                        workOrdersAssigned: true,
                        timeEntries: true,
                    },
                },
            },
        });
        return {
            managers: users
                .filter((user) => user.role === client_1.UserRole.MANAGER)
                .map((user) => ({
                ...user,
                workOrdersCount: user._count.workOrdersAssigned,
                timeEntriesCount: user._count.timeEntries,
            })),
            technicians: users
                .filter((user) => user.role === client_1.UserRole.TECHNICIAN)
                .map((user) => ({
                ...user,
                workOrdersCount: user._count.workOrdersAssigned,
                timeEntriesCount: user._count.timeEntries,
            })),
            summary: {
                totalManagers: users.filter((user) => user.role === client_1.UserRole.MANAGER).length,
                totalTechnicians: users.filter((user) => user.role === client_1.UserRole.TECHNICIAN).length,
                total: users.length,
            },
        };
    }
    async resetPassword(id, dto) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.role === client_1.UserRole.ADMIN) {
            throw new common_1.BadRequestException('Cannot reset password for admin users');
        }
        const saltRounds = parseInt(this.configService.get('BCRYPT_ROUNDS', '10'), 10);
        const hashedPassword = await bcrypt.hash(dto.newPassword, saltRounds);
        await this.prisma.user.update({
            where: { id },
            data: { password: hashedPassword },
        });
        return {
            message: 'Password reset successfully',
            id,
        };
    }
    async delete(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                _count: {
                    select: {
                        workOrdersAssigned: true,
                    },
                },
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user._count.workOrdersAssigned > 0) {
            throw new common_1.BadRequestException('Cannot delete user with assigned work orders');
        }
        await this.prisma.user.delete({
            where: { id },
        });
        return {
            message: 'User deleted successfully',
            id,
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], UsersService);
//# sourceMappingURL=users.service.js.map