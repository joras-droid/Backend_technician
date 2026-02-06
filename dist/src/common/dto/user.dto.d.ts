import { UserRole } from '@prisma/client';
export declare class CreateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    phone?: string;
    address?: string;
    role: UserRole;
    profileImageUrl?: string;
}
export declare class UpdateUserDto {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
    profileImageUrl?: string;
}
export declare class UserResponseDto {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    address?: string;
    username: string;
    profileImageUrl?: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}
