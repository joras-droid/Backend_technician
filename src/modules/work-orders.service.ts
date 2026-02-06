import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAttachmentDto } from '../common/dto/work-order.dto';

@Injectable()
export class WorkOrdersService {
  constructor(private readonly prisma: PrismaService) {}

  findAllForTechnician(technicianId: string) {
    return this.prisma.workOrder.findMany({
      where: { technicianId },
      orderBy: { scheduledAt: 'asc' },
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
