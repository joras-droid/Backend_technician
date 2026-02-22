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
          } as any, // Type assertion needed due to Prisma type generation issue
        } as any,
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
          } as any, // Type assertion needed due to Prisma type generation issue
        } as any,
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

  async create(dto: CreateWorkOrderDto, userId: string) {
    // Verify technician exists
    if (dto.technicianId) {
      const technician = await this.prisma.user.findUnique({
        where: { id: dto.technicianId },
      });
      if (!technician) {
        throw new NotFoundException('Technician not found');
      }
      if (technician.role !== 'TECHNICIAN') {
        throw new BadRequestException('User is not a technician');
      }
    }

    // Verify client exists if provided
    if (dto.clientId) {
      const client = await this.prisma.client.findUnique({
        where: { id: dto.clientId },
      });
      if (!client) {
        throw new NotFoundException('Client not found');
      }
    }

    // Verify template exists if provided
    if (dto.templateId) {
      const template = await this.prisma.workOrderTemplate.findUnique({
        where: { id: dto.templateId },
      });
      if (!template) {
        throw new NotFoundException('Template not found');
      }
    }

    // Generate work order number if not provided
    let workOrderNumber = dto.workOrderNumber;
    if (!workOrderNumber) {
      const prefix = process.env.WORK_ORDER_PREFIX || 'WO';
      const year = new Date().getFullYear();
      const count = await this.prisma.workOrder.count({
        where: {
          workOrderNumber: {
            startsWith: `${prefix}-${year}-`,
          },
        },
      });
      workOrderNumber = `${prefix}-${year}-${String(count + 1).padStart(3, '0')}`;
    } else {
      // Check if work order number already exists
      const existing = await this.prisma.workOrder.findUnique({
        where: { workOrderNumber },
      });
      if (existing) {
        throw new ConflictException('Work order number already exists');
      }
    }

    // Create work order
    const workOrder = await this.prisma.workOrder.create({
      data: {
        workOrderNumber,
        scheduledAt: new Date(dto.scheduledAt),
        estimatedHours: dto.estimatedHours,
        payRate: dto.payRate,
        flatRate: dto.flatRate,
        facilityName: dto.facilityName,
        facilityAddress: dto.facilityAddress,
        facilityLat: dto.facilityLat,
        facilityLng: dto.facilityLng,
        pointOfContact: dto.pointOfContact,
        tasks: dto.tasks,
        notes: dto.notes,
        status: dto.status || WorkOrderStatus.ACTIVE,
        clientId: dto.clientId,
        technicianId: dto.technicianId,
        templateId: dto.templateId,
        equipment: dto.equipment
          ? {
              create: dto.equipment.map((eq) => ({
                name: eq.name,
                quantity: eq.quantity,
                cost: eq.cost, // Cost is mandatory
                vendor: eq.vendor,
                equipmentId: eq.equipmentId,
                isCustom: false, // Admin/Manager created equipment is not custom
                approvalStatus: 'APPROVED' as any, // Pre-approved when created by admin/manager
              })),
            }
          : undefined,
      },
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
          } as any, // Type assertion needed due to Prisma type generation issue
        } as any,
      },
    });

    return workOrder;
  }

  async update(id: string, dto: UpdateWorkOrderDto, userId: string, userRole?: string) {
    // Verify work order exists
    const existing = await this.prisma.workOrder.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException('Work order not found');
    }

    // Get current user to check role
    const currentUser = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    const isTechnician = currentUser?.role === 'TECHNICIAN';
    const isAdminOrManager = currentUser?.role === 'ADMIN' || currentUser?.role === 'MANAGER';

    // If technician, verify work order is assigned to them
    if (isTechnician && existing.technicianId !== userId) {
      throw new BadRequestException('Work order is not assigned to you');
    }

    // Technicians can only update: photos, notes, tasks, status
    if (isTechnician) {
      const restrictedFields: (keyof UpdateWorkOrderDto)[] = [
        'scheduledAt',
        'estimatedHours',
        'payRate',
        'facilityName',
        'facilityAddress',
        'facilityLat',
        'facilityLng',
        'pointOfContact',
        'clientId',
        'technicianId',
        'invoiceNumber',
      ];

      for (const field of restrictedFields) {
        if ((dto as any)[field] !== undefined) {
          throw new BadRequestException(`Technicians cannot update ${field}. Only photos, notes, tasks, and status can be updated.`);
        }
      }
    }

    // Verify technician exists if provided (Admin/Manager only)
    if (dto.technicianId && isAdminOrManager) {
      const technician = await this.prisma.user.findUnique({
        where: { id: dto.technicianId },
      });
      if (!technician) {
        throw new NotFoundException('Technician not found');
      }
      if (technician.role !== 'TECHNICIAN') {
        throw new BadRequestException('User is not a technician');
      }
    }

    // Verify client exists if provided (Admin/Manager only)
    if (dto.clientId && isAdminOrManager) {
      const client = await this.prisma.client.findUnique({
        where: { id: dto.clientId },
      });
      if (!client) {
        throw new NotFoundException('Client not found');
      }
    }

    // Update work order
    const updateData: any = {};
    if (dto.scheduledAt && isAdminOrManager) updateData.scheduledAt = new Date(dto.scheduledAt);
    if (dto.estimatedHours !== undefined && isAdminOrManager) updateData.estimatedHours = dto.estimatedHours;
    if (dto.payRate !== undefined && isAdminOrManager) updateData.payRate = dto.payRate;
    if (dto.flatRate !== undefined && isAdminOrManager) updateData.flatRate = dto.flatRate;
    if (dto.facilityName && isAdminOrManager) updateData.facilityName = dto.facilityName;
    if (dto.facilityAddress && isAdminOrManager) updateData.facilityAddress = dto.facilityAddress;
    if (dto.facilityLat !== undefined && isAdminOrManager) updateData.facilityLat = dto.facilityLat;
    if (dto.facilityLng !== undefined && isAdminOrManager) updateData.facilityLng = dto.facilityLng;
    if (dto.pointOfContact !== undefined && isAdminOrManager) updateData.pointOfContact = dto.pointOfContact;
    if (dto.tasks !== undefined) updateData.tasks = dto.tasks;
    if (dto.notes !== undefined) updateData.notes = dto.notes;
    if (dto.status) updateData.status = dto.status;
    if (dto.clientId !== undefined && isAdminOrManager) updateData.clientId = dto.clientId;
    if (dto.technicianId !== undefined && isAdminOrManager) updateData.technicianId = dto.technicianId;
    if (dto.invoiceNumber !== undefined && isAdminOrManager) updateData.invoiceNumber = dto.invoiceNumber;
    if (dto.beforeWorkPhotos !== undefined) updateData.beforeWorkPhotos = dto.beforeWorkPhotos;
    if (dto.afterWorkPhotos !== undefined) updateData.afterWorkPhotos = dto.afterWorkPhotos;

    const workOrder = await this.prisma.workOrder.update({
      where: { id },
      data: updateData,
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
          } as any, // Type assertion needed due to Prisma type generation issue
        } as any,
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

    return workOrder;
  }

  async delete(id: string, userId: string) {
    // Verify work order exists
    const workOrder = await this.prisma.workOrder.findUnique({
      where: { id },
    });

    if (!workOrder) {
      throw new NotFoundException('Work order not found');
    }

    // Delete work order (cascade will handle related records)
    await this.prisma.workOrder.delete({
      where: { id },
    });

    return {
      message: 'Work order deleted successfully',
      id,
    };
  }

  async duplicate(id: string, dto: DuplicateWorkOrderDto, userId: string) {
    // Get original work order
    const original = await this.prisma.workOrder.findUnique({
      where: { id },
      include: {
        equipment: true,
      },
    });

    if (!original) {
      throw new NotFoundException('Work order not found');
    }

    // Verify technician exists if provided
    if (dto.technicianId) {
      const technician = await this.prisma.user.findUnique({
        where: { id: dto.technicianId },
      });
      if (!technician) {
        throw new NotFoundException('Technician not found');
      }
      if (technician.role !== 'TECHNICIAN') {
        throw new BadRequestException('User is not a technician');
      }
    }

    // Generate new work order number
    const prefix = process.env.WORK_ORDER_PREFIX || 'WO';
    const year = new Date().getFullYear();
    const count = await this.prisma.workOrder.count({
      where: {
        workOrderNumber: {
          startsWith: `${prefix}-${year}-`,
        },
      },
    });
    const workOrderNumber = `${prefix}-${year}-${String(count + 1).padStart(3, '0')}`;

    // Create duplicate
    const workOrder = await this.prisma.workOrder.create({
      data: {
        workOrderNumber,
        scheduledAt: dto.scheduledAt ? new Date(dto.scheduledAt) : original.scheduledAt,
        estimatedHours: original.estimatedHours,
        payRate: original.payRate,
        flatRate: original.flatRate,
        facilityName: original.facilityName,
        facilityAddress: original.facilityAddress,
        facilityLat: original.facilityLat,
        facilityLng: original.facilityLng,
        pointOfContact: original.pointOfContact,
        tasks: original.tasks,
        notes: original.notes,
        status: dto.status || WorkOrderStatus.ACTIVE,
        clientId: original.clientId,
        technicianId: dto.technicianId || original.technicianId,
        templateId: original.templateId,
        equipment: {
          create: original.equipment.map((eq: any) => ({
            name: eq.name,
            quantity: eq.quantity,
            cost: eq.cost || 0, // Ensure cost is set
            vendor: eq.vendor,
            equipmentId: eq.equipmentId,
            isCustom: eq.isCustom || false,
            approvalStatus: eq.approvalStatus || 'APPROVED',
            receiptUrl: eq.receiptUrl,
            addedByTechnicianId: eq.addedByTechnicianId,
          })),
        },
      },
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
          } as any, // Type assertion needed due to Prisma type generation issue
        } as any,
      },
    });

    return workOrder;
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
