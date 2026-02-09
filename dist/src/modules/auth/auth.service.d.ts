import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import { SignUpDto, SignInDto } from '../../common/dto/auth.dto';
import { UserRole } from '@prisma/client';
type UserSelectResult = {
    id: string;
    email: string;
    username: string;
    password?: string | null;
    whitelisted?: boolean;
    role: UserRole;
    firstName: string;
    lastName: string;
    phone: string | null;
    address: string | null;
    profileImageUrl?: string | null;
    createdAt: Date;
    updatedAt: Date;
};
export declare class AuthService {
    private prisma;
    private jwtService;
    private configService;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService);
    signUp(signUpDto: SignUpDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: UserSelectResult;
    }>;
    signIn(signInDto: SignInDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            username: string;
            whitelisted?: boolean;
            role: UserRole;
            firstName: string;
            lastName: string;
            phone: string | null;
            address: string | null;
            profileImageUrl?: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    updateProfileImage(userId: string, profileImageUrl: string): Promise<UserSelectResult>;
    private generateTokens;
    validateUser(userId: string): Promise<UserSelectResult | null>;
}
export {};
