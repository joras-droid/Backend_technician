import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string, page: number = 1, limit: number = 20, unreadOnly: boolean = false) {
    const skip = (page - 1) * limit;
    const take = Math.min(limit, 100);

    const where: any = { userId };
    if (unreadOnly) {
      where.readAt = null;
    }

    const total = await this.prisma.notification.count({ where });

    const notifications = await this.prisma.notification.findMany({
      where,
      skip,
      take,
      orderBy: { createdAt: 'desc' },
    });

    return {
      data: notifications.map((n) => ({
        ...n,
        read: n.readAt !== null,
      })),
      pagination: {
        page,
        limit: take,
        total,
        totalPages: Math.ceil(total / take),
      },
    };
  }

  async markAsRead(id: string, userId: string) {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });

    if (!notification) {
      throw new NotFoundException('Notification not found');
    }

    if (notification.userId !== userId) {
      throw new ForbiddenException('Unauthorized');
    }

    return this.prisma.notification.update({
      where: { id },
      data: {
        readAt: new Date(),
      },
    });
  }

  async getUnreadCount(userId: string) {
    const count = await this.prisma.notification.count({
      where: {
        userId,
        readAt: null,
      },
    });

    return { unreadCount: count };
  }
}
