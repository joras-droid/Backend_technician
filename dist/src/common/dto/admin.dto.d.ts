import { UserRole } from '@prisma/client';
export declare class CreateEmployeeDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
    role?: UserRole;
    defaultPayRate?: number;
}
export declare class WhitelistEmailDto {
    email: string;
    firstName?: string;
    lastName?: string;
}
export declare class WhitelistEmailsDto {
    emails: string[];
}
export declare class EmployeeResponseDto {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    address?: string;
    username: string;
    role: UserRole;
    whitelisted: boolean;
    createdAt: Date;
    updatedAt: Date;
}
