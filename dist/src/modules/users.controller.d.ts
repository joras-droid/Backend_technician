import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
        password: string;
        profileImageUrl: string | null;
        role: import(".prisma/client").$Enums.UserRole;
        whitelisted: boolean;
    }[]>;
}
