import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findTechnicians(): import(".prisma/client").Prisma.PrismaPromise<{
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
