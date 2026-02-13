import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';
import { EmailService } from '../../common/services/email.service';
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
    private emailService;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService, emailService: EmailService);
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
    refreshToken(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    updateProfile(userId: string, dto: any): Promise<UserSelectResult>;
    changePassword(userId: string, currentPassword: string, newPassword: string): Promise<{
        message: string;
    }>;
    requestPasswordReset(email: string): Promise<{
        message: string;
    }>;
    confirmPasswordReset(email: string, otp: string, newPassword: string): Promise<{
        message: string;
    }>;
}
export {};
