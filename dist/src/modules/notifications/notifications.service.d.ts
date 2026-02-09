import { PrismaService } from '../../prisma/prisma.service';
export declare class NotificationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(userId: string, page?: number, limit?: number, unreadOnly?: boolean): Promise<{
        data: {
            read: boolean;
            id: string;
            createdAt: Date;
            type: import(".prisma/client").$Enums.NotificationType;
            title: string;
            message: string;
            entityId: string | null;
            userId: string;
            channel: import(".prisma/client").$Enums.NotificationChannel;
            entityType: string | null;
            deliveredAt: Date | null;
            readAt: Date | null;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    markAsRead(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        type: import(".prisma/client").$Enums.NotificationType;
        title: string;
        message: string;
        entityId: string | null;
        userId: string;
        channel: import(".prisma/client").$Enums.NotificationChannel;
        entityType: string | null;
        deliveredAt: Date | null;
        readAt: Date | null;
    }>;
    getUnreadCount(userId: string): Promise<{
        unreadCount: number;
    }>;
}
