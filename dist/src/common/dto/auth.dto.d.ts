import { UserRole } from '@prisma/client';
export declare class SignUpDto {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    phone?: string;
    address?: string;
    role?: UserRole;
    profileImageUrl?: string;
}
export declare class RefreshTokenDto {
    refreshToken: string;
}
export declare class PasswordResetRequestDto {
    email: string;
}
export declare class PasswordResetConfirmDto {
    token: string;
    newPassword: string;
}
export declare class ChangePasswordDto {
    currentPassword: string;
    newPassword: string;
}
export declare class SignInDto {
    username: string;
    password: string;
}
export declare class RequestPresignedUrlDto {
    fileName: string;
    contentType: string;
    uploadType: 'profile' | 'work-order-photo' | 'work-order-receipt';
    workOrderId?: string;
}
export declare class PresignedUrlResponseDto {
    presignedUrl: string;
    key: string;
    publicUrl: string;
    expiresIn: number;
}
