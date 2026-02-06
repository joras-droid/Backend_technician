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
    getPresignedUrl(dto: RequestPresignedUrlDto): Promise<PresignedUrlResponseDto>;
    getProfilePresignedUrl(req: AuthenticatedRequest, dto: ProfilePresignedUrlRequestDto): Promise<PresignedUrlResponseDto>;
    updateProfileImage(req: AuthenticatedRequest, dto: ProfileImageUrlDto): Promise<{
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
}
