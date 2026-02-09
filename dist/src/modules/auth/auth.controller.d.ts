import { AuthService } from './auth.service';
import { S3Service } from '../../common/services/s3.service';
import { SignUpDto, SignInDto, RequestPresignedUrlDto, PresignedUrlResponseDto } from '../../common/dto/auth.dto';
import { AuthenticatedRequest } from '../../common/interfaces/request.interface';
import { ProfileImageUrlDto, ProfilePresignedUrlRequestDto, UpdateProfileDto } from '../../common/dto/profile.dto';
import { RefreshTokenDto, PasswordResetRequestDto, PasswordResetConfirmDto, ChangePasswordDto } from '../../common/dto/auth.dto';
export declare class AuthController {
    private authService;
    private s3Service;
    constructor(authService: AuthService, s3Service: S3Service);
    signUp(signUpDto: SignUpDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            username: string;
            password?: string | null;
            whitelisted?: boolean;
            role: import(".prisma/client").UserRole;
            firstName: string;
            lastName: string;
            phone: string | null;
            address: string | null;
            profileImageUrl?: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    signIn(signInDto: SignInDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            email: string;
            username: string;
            whitelisted?: boolean;
            role: import(".prisma/client").UserRole;
            firstName: string;
            lastName: string;
            phone: string | null;
            address: string | null;
            profileImageUrl?: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    getPresignedUrl(dto: RequestPresignedUrlDto): Promise<PresignedUrlResponseDto>;
    getProfilePresignedUrl(req: AuthenticatedRequest, dto: ProfilePresignedUrlRequestDto): Promise<PresignedUrlResponseDto>;
    updateProfileImage(req: AuthenticatedRequest, dto: ProfileImageUrlDto): Promise<{
        id: string;
        email: string;
        username: string;
        password?: string | null;
        whitelisted?: boolean;
        role: import(".prisma/client").UserRole;
        firstName: string;
        lastName: string;
        phone: string | null;
        address: string | null;
        profileImageUrl?: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    refreshToken(dto: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    requestPasswordReset(dto: PasswordResetRequestDto): Promise<{
        message: string;
    }>;
    confirmPasswordReset(dto: PasswordResetConfirmDto): Promise<{
        message: string;
    }>;
    updateProfile(req: AuthenticatedRequest, dto: UpdateProfileDto): Promise<{
        id: string;
        email: string;
        username: string;
        password?: string | null;
        whitelisted?: boolean;
        role: import(".prisma/client").UserRole;
        firstName: string;
        lastName: string;
        phone: string | null;
        address: string | null;
        profileImageUrl?: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    changePassword(req: AuthenticatedRequest, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
}
