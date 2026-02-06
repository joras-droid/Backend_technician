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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const bcrypt = __importStar(require("bcrypt"));
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let AuthService = class AuthService {
    prisma;
    jwtService;
    configService;
    constructor(prisma, jwtService, configService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async signUp(signUpDto) {
        const { password, email, username, ...rest } = signUpDto;
        const whitelistedUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!whitelistedUser || !whitelistedUser.whitelisted) {
            throw new common_1.UnauthorizedException('Email is not whitelisted. Please contact administrator.');
        }
        if (whitelistedUser.password) {
            throw new common_1.ConflictException('User account already exists. Please sign in instead.');
        }
        const existingUsername = await this.prisma.user.findUnique({
            where: { username },
        });
        if (existingUsername && existingUsername.id !== whitelistedUser.id) {
            throw new common_1.ConflictException('Username is already taken');
        }
        const saltRounds = parseInt(this.configService.get('BCRYPT_ROUNDS', '10'), 10);
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await this.prisma.user.update({
            where: { email },
            data: {
                ...rest,
                username,
                password: hashedPassword,
                role: rest.role || whitelistedUser.role || client_1.UserRole.TECHNICIAN,
                whitelisted: true,
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
                createdAt: true,
                updatedAt: true,
            },
        });
        const tokens = await this.generateTokens(user.id, user.role);
        return {
            user,
            ...tokens,
        };
    }
    async signIn(signInDto) {
        const { username, password } = signInDto;
        const user = await this.prisma.user.findUnique({
            where: { username },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (!user.whitelisted) {
            throw new common_1.UnauthorizedException('Your account is not authorized. Please contact administrator.');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const tokens = await this.generateTokens(user.id, user.role);
        const { password: _, ...userWithoutPassword } = user;
        return {
            user: userWithoutPassword,
            ...tokens,
        };
    }
    async updateProfileImage(userId, profileImageUrl) {
        return this.prisma.user.update({
            where: { id: userId },
            data: { profileImageUrl },
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
    async generateTokens(userId, role) {
        const payload = { sub: userId, role };
        const jwtSecret = this.configService.get('JWT_SECRET');
        const jwtRefreshSecret = this.configService.get('JWT_REFRESH_SECRET');
        if (!jwtSecret || !jwtRefreshSecret) {
            throw new Error('JWT secrets are not configured');
        }
        const accessTokenExpiresIn = this.configService.get('JWT_EXPIRES_IN', '7d');
        const refreshTokenExpiresIn = this.configService.get('JWT_REFRESH_EXPIRES_IN', '30d');
        const accessTokenOptions = {
            secret: jwtSecret,
            expiresIn: accessTokenExpiresIn,
        };
        const refreshTokenOptions = {
            secret: jwtRefreshSecret,
            expiresIn: refreshTokenExpiresIn,
        };
        const accessToken = this.jwtService.sign(payload, accessTokenOptions);
        const refreshToken = this.jwtService.sign(payload, refreshTokenOptions);
        return {
            accessToken,
            refreshToken,
        };
    }
    async validateUser(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
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
        return user;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map