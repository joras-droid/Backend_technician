import { NotificationsService } from './notifications.service';
import { AuthenticatedRequest } from '../../common/interfaces/request.interface';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    findAll(page: string, limit: string, unreadOnly: string, req: AuthenticatedRequest): Promise<{
        data: {
            read: boolean;
            id: string;
            createdAt: Date;
            type: import(".prisma/client").$Enums.NotificationType;
            entityId: string | null;
            userId: string;
            channel: import(".prisma/client").$Enums.NotificationChannel;
            title: string;
            message: string;
            deliveredAt: Date | null;
            readAt: Date | null;
            entityType: string | null;
        }[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getUnreadCount(req: AuthenticatedRequest): Promise<{
        unreadCount: number;
    }>;
    markAsRead(id: string, req: AuthenticatedRequest): Promise<{
        id: string;
        createdAt: Date;
        type: import(".prisma/client").$Enums.NotificationType;
        entityId: string | null;
        userId: string;
        channel: import(".prisma/client").$Enums.NotificationChannel;
        title: string;
        message: string;
        deliveredAt: Date | null;
        readAt: Date | null;
        entityType: string | null;
    }>;
}
