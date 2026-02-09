import { AuthService } from './auth.service';
import { S3Service } from '../../common/services/s3.service';
import { SignUpDto, SignInDto, RequestPresignedUrlDto, PresignedUrlResponseDto } from '../../common/dto/auth.dto';
import { AuthenticatedRequest } from '../../common/interfaces/request.interface';
import { ProfileImageUrlDto, ProfilePresignedUrlRequestDto } from '../../common/dto/profile.dto';
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
}
