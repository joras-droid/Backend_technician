import { UserRole } from '@prisma/client';
export declare class ListUsersQueryDto {
    role?: UserRole;
    page?: number;
    limit?: number;
    search?: string;
}
export declare class UpdateUserDto {
    firstName?: string;
    lastName?: string;
    email?: string;
    username?: string;
    phone?: string;
    address?: string;
    role?: UserRole;
}
export declare class ResetUserPasswordDto {
    newPassword: string;
}
