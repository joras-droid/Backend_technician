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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
const config_1 = require("@nestjs/config");
const client_1 = require("@prisma/client");
let AdminService = class AdminService {
    prisma;
    configService;
    constructor(prisma, configService) {
        this.prisma = prisma;
        this.configService = configService;
    }
    async listWhitelistedEmails() {
        const users = await this.prisma.user.findMany({
            where: {
                whitelisted: true,
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                username: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
            orderBy: {
                email: 'asc',
            },
        });
        return users.map((user) => {
            const timeDiff = user.updatedAt.getTime() - user.createdAt.getTime();
            const accountCreated = timeDiff > 5000;
            return {
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                role: user.role,
                accountCreated,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            };
        });
    }
    async whitelistEmail(dto) {
        const { email, firstName, lastName } = dto;
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            if (existingUser.whitelisted) {
                throw new common_1.ConflictException('Email is already whitelisted');
            }
            return this.prisma.user.update({
                where: { email },
                data: {
                    whitelisted: true,
                    firstName: firstName || existingUser.firstName,
                    lastName: lastName || existingUser.lastName,
                },
                select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                    username: true,
                    role: true,
                    whitelisted: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
        }
        const baseUsername = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');
        let username = baseUsername + '_' + Date.now().toString().slice(-6);
        let counter = 0;
        while (await this.prisma.user.findUnique({ where: { username } })) {
            username = baseUsername + '_' + Date.now().toString().slice(-6) + '_' + counter;
            counter++;
        }
        const tempPassword = 'TEMP_PASSWORD_' + Date.now().toString();
        const saltRounds = parseInt(this.configService.get('BCRYPT_ROUNDS', '10'), 10);
        const hashedTempPassword = await bcrypt.hash(tempPassword, saltRounds);
        return this.prisma.user.create({
            data: {
                email,
                firstName: firstName || '',
                lastName: lastName || '',
                username,
                password: hashedTempPassword,
                role: client_1.UserRole.TECHNICIAN,
                whitelisted: true,
            },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                username: true,
                role: true,
                whitelisted: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
    async whitelistEmails(dto) {
        const { emails } = dto;
        const results = [];
        for (const email of emails) {
            try {
                const result = await this.whitelistEmail({ email });
                results.push({ email, status: 'success', data: result });
            }
            catch (error) {
                results.push({
                    email,
                    status: 'error',
                    error: error.message,
                });
            }
        }
        return results;
    }
    async createEmployee(dto) {
        const { password, email, payRate, defaultPayRate, ...rest } = dto;
        const effectivePayRate = defaultPayRate ?? payRate;
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            if (existingUser.password) {
                throw new common_1.ConflictException('Employee account already exists');
            }
            const saltRounds = parseInt(this.configService.get('BCRYPT_ROUNDS', '10'), 10);
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            return this.prisma.user.update({
                where: { email },
                data: {
                    ...rest,
                    password: hashedPassword,
                    whitelisted: true,
                    defaultPayRate: effectivePayRate,
                },
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
                    defaultPayRate: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
        }
        const baseUsername = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');
        let username = baseUsername + '_' + Date.now().toString().slice(-6);
        let counter = 0;
        while (await this.prisma.user.findUnique({ where: { username } })) {
            username = baseUsername + '_' + Date.now().toString().slice(-6) + '_' + counter;
            counter++;
        }
        const saltRounds = parseInt(this.configService.get('BCRYPT_ROUNDS', '10'), 10);
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return this.prisma.user.create({
            data: {
                ...rest,
                email,
                username,
                password: hashedPassword,
                role: rest.role || client_1.UserRole.TECHNICIAN,
                whitelisted: true,
                defaultPayRate: effectivePayRate,
            },
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
                defaultPayRate: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
    async removeFromWhitelist(email) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new common_1.NotFoundException('Email not found');
        }
        if (!user.whitelisted) {
            throw new common_1.BadRequestException('Email is not whitelisted');
        }
        const timeDiff = user.updatedAt.getTime() - user.createdAt.getTime();
        const accountActivated = timeDiff > 5000;
        if (!accountActivated) {
            await this.prisma.user.delete({
                where: { email },
            });
            return { message: 'Email removed from whitelist', email };
        }
        else {
            await this.prisma.user.update({
                where: { email },
                data: { whitelisted: false },
            });
            return { message: 'Email removed from whitelist (account deactivated)', email };
        }
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        config_1.ConfigService])
], AdminService);
//# sourceMappingURL=admin.service.js.map