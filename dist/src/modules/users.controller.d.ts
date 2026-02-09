import { UsersService } from './users.service';
import { ListUsersQueryDto, UpdateUserDto, ResetUserPasswordDto } from '../common/dto/user-management.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(query: ListUsersQueryDto): Promise<{
        data: {
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
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getTechnicians(): import(".prisma/client").Prisma.PrismaPromise<{
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
    }[]>;
    getManagersAndTechnicians(): Promise<{
        managers: {
            workOrdersCount: number;
            timeEntriesCount: number;
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
            _count: {
                workOrdersAssigned: number;
                timeEntries: number;
            };
        }[];
        technicians: {
            workOrdersCount: number;
            timeEntriesCount: number;
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
            _count: {
                workOrdersAssigned: number;
                timeEntries: number;
            };
        }[];
        summary: {
            totalManagers: number;
            totalTechnicians: number;
            total: number;
        };
    }>;
    findOne(id: string): Promise<{
        workOrdersCount: number;
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
        _count: {
            workOrdersAssigned: number;
        };
    }>;
    update(id: string, dto: UpdateUserDto): Promise<{
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
    resetPassword(id: string, dto: ResetUserPasswordDto): Promise<{
        message: string;
        id: string;
    }>;
    delete(id: string): Promise<{
        message: string;
        id: string;
    }>;
}
