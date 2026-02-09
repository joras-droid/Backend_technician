import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateAttachmentDto,
  ListWorkOrdersQueryDto,
  CreateWorkOrderDto,
  UpdateWorkOrderDto,
  DuplicateWorkOrderDto,
} from '../common/dto/work-order.dto';
import { WorkOrderStatus } from '@prisma/client';

@Injectable()
export class WorkOrdersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: ListWorkOrdersQueryDto) {
    const {
      status,
      technicianId,
      clientId,
      scheduledFrom,
      scheduledTo,
      workOrderNumber,
      page = 1,
      limit = 20,
      sortBy = 'scheduledAt',
      sortOrder = 'asc',
    } = query;

    // Build where clause
    const where: any = {};

    if (status) {
      where.status = status as WorkOrderStatus;
    }

    if (technicianId) {
      where.technicianId = technicianId;
    }

    if (clientId) {
      where.clientId = clientId;
    }

    if (scheduledFrom || scheduledTo) {
      where.scheduledAt = {};
      if (scheduledFrom) {
        where.scheduledAt.gte = new Date(scheduledFrom);
      }
      if (scheduledTo) {
        where.scheduledAt.lte = new Date(scheduledTo);
      }
    }

    if (workOrderNumber) {
      where.workOrderNumber = {
        contains: workOrderNumber,
        mode: 'insensitive',
      };
    }

    // Calculate pagination
    const skip = (page - 1) * limit;
    const take = Math.min(limit, 100); // Max 100 items per page

    // Build orderBy
    const orderBy: any = {};
    orderBy[sortBy] = sortOrder;

    // Get total count for pagination
    const total = await this.prisma.workOrder.count({ where });

    // Get work orders
    const workOrders = await this.prisma.workOrder.findMany({
      where,
      skip,
      take,
      orderBy,
      include: {
        attachments: true,
        equipment: true,
        client: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        technician: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            profileImageUrl: true,
          },
        },
      },
    });

    return {
      data: workOrders,
      pagination: {
        page,
        limit: take,
        total,
        totalPages: Math.ceil(total / take),
      },
    };
  }

  findAllForTechnician(technicianId: string) {
    return this.prisma.workOrder.findMany({
      where: { technicianId },
      orderBy: [
        { status: 'asc' }, // ACTIVE first, then COMPLETED, then PAID
        { scheduledAt: 'asc' },
      ],
      include: {
        attachments: true,
        equipment: true,
        client: true,
        technician: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
      },
    });
  }

  findOne(id: string) {
    return this.prisma.workOrder.findUnique({
      where: { id },
      include: {
        attachments: true,
        equipment: true,
        client: true,
        technician: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            profileImageUrl: true,
          },
        },
        timeEntries: {
          include: {
            technician: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });
  }

  async createAttachment(
    workOrderId: string,
    dto: CreateAttachmentDto,
    userId: string,
  ) {
    // Verify work order exists
    const workOrder = await this.prisma.workOrder.findUnique({
      where: { id: workOrderId },
    });

    if (!workOrder) {
      throw new NotFoundException('Work order not found');
    }

    // Create attachment record
    return this.prisma.attachment.create({
      data: {
        workOrderId,
        url: dto.url,
        type: dto.type,
        description: dto.description,
      },
    });
  }
}
