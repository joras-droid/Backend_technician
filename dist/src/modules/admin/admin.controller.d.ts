import { AdminService } from './admin.service';
import { CreateEmployeeDto, WhitelistEmailDto, WhitelistEmailsDto } from '../../common/dto/admin.dto';
import { AuthenticatedRequest } from '../../common/interfaces/request.interface';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    listWhitelistedEmails(): Promise<{
        email: string;
        firstName: string;
        lastName: string;
        username: string;
        role: import(".prisma/client").$Enums.UserRole;
        accountCreated: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    whitelistEmail(dto: WhitelistEmailDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        firstName: string;
        lastName: string;
        email: string;
        username: string;
        role: import(".prisma/client").$Enums.UserRole;
        whitelisted: boolean;
    }>;
    whitelistEmails(dto: WhitelistEmailsDto): Promise<({
        email: string;
        status: string;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            firstName: string;
            lastName: string;
            email: string;
            username: string;
            role: import(".prisma/client").$Enums.UserRole;
            whitelisted: boolean;
        };
        error?: undefined;
    } | {
        email: string;
        status: string;
        error: any;
        data?: undefined;
    })[]>;
    createEmployee(dto: CreateEmployeeDto, req: AuthenticatedRequest): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        firstName: string;
        lastName: string;
        email: string;
        phone: string | null;
        address: string | null;
        username: string;
        role: import(".prisma/client").$Enums.UserRole;
        profileImageUrl: string | null;
        whitelisted: boolean;
        defaultPayRate: number | null;
    }>;
    removeFromWhitelist(email: string): Promise<{
        message: string;
        email: string;
    }>;
}
