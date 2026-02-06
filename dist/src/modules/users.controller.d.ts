import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getTechnicians(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        firstName: string;
        lastName: string;
        email: string;
        phone: string | null;
        address: string | null;
        username: string;
        password: string;
        profileImageUrl: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        whitelisted: boolean;
    }[]>;
}
