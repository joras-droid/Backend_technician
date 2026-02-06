import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import { SignUpDto, SignInDto } from '../../common/dto/auth.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    private configService;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService);
    signUp(signUpDto: SignUpDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            firstName: string;
            lastName: string;
            email: string;
            phone: string | null;
            address: string | null;
            username: string;
            profileImageUrl: string | null;
            role: import(".prisma/client").$Enums.UserRole;
        };
    }>;
    signIn(signInDto: SignInDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            firstName: string;
            lastName: string;
            email: string;
            phone: string | null;
            address: string | null;
            username: string;
            profileImageUrl: string | null;
            role: import(".prisma/client").$Enums.UserRole;
            whitelisted: boolean;
        };
    }>;
    updateProfileImage(userId: string, profileImageUrl: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        firstName: string;
        lastName: string;
        email: string;
        phone: string | null;
        address: string | null;
        username: string;
        profileImageUrl: string | null;
        role: import(".prisma/client").$Enums.UserRole;
    }>;
    private generateTokens;
    validateUser(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        firstName: string;
        lastName: string;
        email: string;
        phone: string | null;
        address: string | null;
        username: string;
        profileImageUrl: string | null;
        role: import(".prisma/client").$Enums.UserRole;
    } | null>;
}
