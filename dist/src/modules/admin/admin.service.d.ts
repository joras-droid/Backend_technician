import { PrismaService } from '../../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { CreateEmployeeDto, WhitelistEmailDto, WhitelistEmailsDto } from '../../common/dto/admin.dto';
export declare class AdminService {
    private prisma;
    private configService;
    constructor(prisma: PrismaService, configService: ConfigService);
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
        email: string;
        username: string;
        createdAt: Date;
        updatedAt: Date;
        firstName: string;
        lastName: string;
        role: import(".prisma/client").$Enums.UserRole;
        whitelisted: boolean;
    }>;
    whitelistEmails(dto: WhitelistEmailsDto): Promise<({
        email: string;
        status: string;
        data: {
            id: string;
            email: string;
            username: string;
            createdAt: Date;
            updatedAt: Date;
            firstName: string;
            lastName: string;
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
    createEmployee(dto: CreateEmployeeDto): Promise<{
        id: string;
        email: string;
        username: string;
        createdAt: Date;
        updatedAt: Date;
        firstName: string;
        lastName: string;
        phone: string | null;
        address: string | null;
        profileImageUrl: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        whitelisted: boolean;
    }>;
    removeFromWhitelist(email: string): Promise<{
        message: string;
        email: string;
    }>;
}
