import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateEquipmentDto,
  UpdateEquipmentDto,
  SearchEquipmentQueryDto,
  AddCatalogEquipmentDto,
  AddCustomEquipmentDto,
  ApproveEquipmentDto,
  RejectEquipmentDto,
} from '../../common/dto/equipment.dto';
import { EquipmentApprovalStatus, NotificationType, NotificationChannel } from '@prisma/client';

@Injectable()
export class EquipmentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEquipmentDto) {
    // Check if equipment name already exists
    const existing = await this.prisma.equipment.findUnique({
      where: { name: dto.name },
    });

    if (existing) {
      throw new ConflictException('Equipment with this name already exists');
    }

    // Validate range if provided
    if (dto.minRange !== undefined && dto.maxRange !== undefined) {
      if (dto.minRange > dto.maxRange) {
        throw new BadRequestException('minRange cannot be greater than maxRange');
      }
    }

    return this.prisma.equipment.create({
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        minRange: dto.minRange,
        maxRange: dto.maxRange,
        vendor: dto.vendor,
      },
    });
  }

  async findAll() {
    return this.prisma.equipment.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const equipment = await this.prisma.equipment.findUnique({
      where: { id },
    });

    if (!equipment) {
      throw new NotFoundException('Equipment not found');
    }

    return equipment;
  }

  async update(id: string, dto: UpdateEquipmentDto) {
    const equipment = await this.prisma.equipment.findUnique({
      where: { id },
    });

    if (!equipment) {
      throw new NotFoundException('Equipment not found');
    }

    // Check if name already exists (if changed)
    if (dto.name && dto.name !== equipment.name) {
      const existing = await this.prisma.equipment.findUnique({
        where: { name: dto.name },
      });
      if (existing) {
        throw new ConflictException('Equipment with this name already exists');
      }
    }

    // Validate range if provided
    if (dto.minRange !== undefined && dto.maxRange !== undefined) {
      if (dto.minRange > dto.maxRange) {
        throw new BadRequestException('minRange cannot be greater than maxRange');
      }
    }

    return this.prisma.equipment.update({
      where: { id },
      data: {
        name: dto.name,
        description: dto.description,
        price: dto.price,
        minRange: dto.minRange,
        maxRange: dto.maxRange,
        vendor: dto.vendor,
        isActive: dto.isActive,
      },
    });
  }

  async delete(id: string) {
    const equipment = await this.prisma.equipment.findUnique({
      where: { id },
    });

    if (!equipment) {
      throw new NotFoundException('Equipment not found');
    }

    await this.prisma.equipment.delete({
      where: { id },
    });

    return {
      message: 'Equipment deleted successfully',
      id,
    };
  }

  async search(query: SearchEquipmentQueryDto) {
    const { search, limit = 20 } = query;

    // Fuzzy search using PostgreSQL's case-insensitive LIKE
    // For better fuzzy matching, you could use PostgreSQL's full-text search or trigram similarity
    const searchTerm = `%${search}%`;

    const equipment = await this.prisma.equipment.findMany({
      where: {
        isActive: true,
        OR: [
          { name: { contains: searchTerm, mode: 'insensitive' } },
          { description: { contains: searchTerm, mode: 'insensitive' } },
          { vendor: { contains: searchTerm, mode: 'insensitive' } },
        ],
      },
      take: limit,
      orderBy: [
        // Prioritize exact matches first
        { name: 'asc' },
      ],
    });

    // Sort by relevance (exact match > starts with > contains)
    const sorted = equipment.sort((a, b) => {
      const aNameLower = a.name.toLowerCase();
      const bNameLower = b.name.toLowerCase();
      const searchLower = search.toLowerCase();

      const aExact = aNameLower === searchLower ? 3 : aNameLower.startsWith(searchLower) ? 2 : 1;
      const bExact = bNameLower === searchLower ? 3 : bNameLower.startsWith(searchLower) ? 2 : 1;

      return bExact - aExact;
    });

    return sorted;
  }

  async addCatalogEquipment(
    workOrderId: string,
    dto: AddCatalogEquipmentDto,
    technicianId: string,
  ) {
    // Verify work order exists and is assigned to technician
    const workOrder = await this.prisma.workOrder.findUnique({
      where: { id: workOrderId },
    });

    if (!workOrder) {
      throw new NotFoundException('Work order not found');
    }

    if (workOrder.technicianId !== technicianId) {
      throw new BadRequestException('Work order is not assigned to you');
    }

    // Verify equipment exists in catalog
    const catalogEquipment = await this.prisma.equipment.findUnique({
      where: { id: dto.equipmentId },
    });

    if (!catalogEquipment) {
      throw new NotFoundException('Equipment not found in catalog');
    }

    if (!catalogEquipment.isActive) {
      throw new BadRequestException('Equipment is not active');
    }

    // Create equipment entry linked to catalog (pre-approved)
    const equipment = await this.prisma.workOrderEquipment.create({
      data: {
        workOrderId,
        equipmentId: dto.equipmentId,
        name: catalogEquipment.name,
        quantity: dto.quantity,
        cost: catalogEquipment.price, // Use catalog price
        vendor: catalogEquipment.vendor,
        isCustom: false, // Catalog equipment is not custom
        approvalStatus: EquipmentApprovalStatus.APPROVED, // Pre-approved
      },
      include: {
        workOrder: {
          select: {
            workOrderNumber: true,
          },
        },
        equipment: {
          select: {
            id: true,
            name: true,
            price: true,
          },
        },
      },
    });

    return equipment;
  }

  async addCustomEquipment(
    workOrderId: string,
    dto: AddCustomEquipmentDto,
    technicianId: string,
  ) {
    // Verify work order exists and is assigned to technician
    const workOrder = await this.prisma.workOrder.findUnique({
      where: { id: workOrderId },
    });

    if (!workOrder) {
      throw new NotFoundException('Work order not found');
    }

    if (workOrder.technicianId !== technicianId) {
      throw new BadRequestException('Work order is not assigned to you');
    }

    // Create custom equipment with PENDING status
    const equipment = await this.prisma.workOrderEquipment.create({
      data: {
        workOrderId,
        name: dto.name,
        quantity: dto.quantity,
        cost: dto.cost,
        vendor: dto.vendor,
        receiptUrl: dto.receiptUrl,
        isCustom: true,
        addedByTechnicianId: technicianId,
        approvalStatus: EquipmentApprovalStatus.PENDING,
      },
      include: {
        workOrder: {
          select: {
            workOrderNumber: true,
          },
        },
        addedByTechnician: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    // Create notifications for all admins and managers
    const adminsAndManagers = await this.prisma.user.findMany({
      where: {
        role: {
          in: ['ADMIN', 'MANAGER'],
        },
      },
      select: {
        id: true,
      },
    });

    const technicianName = equipment.addedByTechnician
      ? `${equipment.addedByTechnician.firstName} ${equipment.addedByTechnician.lastName}`
      : 'A technician';

    const notifications = adminsAndManagers.map((user) => ({
      userId: user.id,
      type: NotificationType.EQUIPMENT_APPROVAL_REQUIRED,
      channel: NotificationChannel.PUSH,
      title: 'Equipment Approval Required',
      message: `${technicianName} added custom equipment "${dto.name}" ($${dto.cost}) to work order ${equipment.workOrder.workOrderNumber}`,
      entityId: equipment.id,
      entityType: 'equipment',
    }));

    await this.prisma.notification.createMany({
      data: notifications,
    });

    return equipment;
  }

  async approveEquipment(
    equipmentId: string,
    dto: ApproveEquipmentDto,
    approverId: string,
  ) {
    const equipment = await this.prisma.workOrderEquipment.findUnique({
      where: { id: equipmentId },
      include: {
        addedByTechnician: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        workOrder: {
          select: {
            workOrderNumber: true,
          },
        },
      },
    });

    if (!equipment) {
      throw new NotFoundException('Equipment not found');
    }

    if (!equipment.isCustom) {
      throw new BadRequestException('Only custom equipment can be approved');
    }

    if (equipment.approvalStatus !== EquipmentApprovalStatus.PENDING) {
      throw new BadRequestException('Equipment has already been processed');
    }

    // Update equipment status
    const updated = await this.prisma.workOrderEquipment.update({
      where: { id: equipmentId },
      data: {
        approvalStatus: EquipmentApprovalStatus.APPROVED,
        approvedById: approverId,
        approvedAt: new Date(),
      },
      include: {
        addedByTechnician: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        approvedBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    // Notify technician
    await this.prisma.notification.create({
      data: {
        userId: equipment.addedByTechnicianId!,
        type: NotificationType.EQUIPMENT_APPROVED,
        channel: NotificationChannel.PUSH,
        title: 'Equipment Approved',
        message: `Your custom equipment "${equipment.name}" for work order ${equipment.workOrder.workOrderNumber} has been approved.`,
        entityId: equipment.id,
        entityType: 'equipment',
      },
    });

    return updated;
  }

  async rejectEquipment(
    equipmentId: string,
    dto: RejectEquipmentDto,
    approverId: string,
  ) {
    const equipment = await this.prisma.workOrderEquipment.findUnique({
      where: { id: equipmentId },
      include: {
        addedByTechnician: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        workOrder: {
          select: {
            workOrderNumber: true,
          },
        },
      },
    });

    if (!equipment) {
      throw new NotFoundException('Equipment not found');
    }

    if (!equipment.isCustom) {
      throw new BadRequestException('Only custom equipment can be rejected');
    }

    if (equipment.approvalStatus !== EquipmentApprovalStatus.PENDING) {
      throw new BadRequestException('Equipment has already been processed');
    }

    // Update equipment status
    const updated = await this.prisma.workOrderEquipment.update({
      where: { id: equipmentId },
      data: {
        approvalStatus: EquipmentApprovalStatus.REJECTED,
        approvedById: approverId,
        approvedAt: new Date(),
        rejectionReason: dto.reason,
      },
      include: {
        addedByTechnician: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        approvedBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    // Notify technician
    await this.prisma.notification.create({
      data: {
        userId: equipment.addedByTechnicianId!,
        type: NotificationType.EQUIPMENT_REJECTED,
        channel: NotificationChannel.PUSH,
        title: 'Equipment Rejected',
        message: `Your custom equipment "${equipment.name}" for work order ${equipment.workOrder.workOrderNumber} has been rejected. Reason: ${dto.reason}`,
        entityId: equipment.id,
        entityType: 'equipment',
      },
    });

    return updated;
  }

  async getPendingApprovals() {
    return this.prisma.workOrderEquipment.findMany({
      where: {
        isCustom: true,
        approvalStatus: EquipmentApprovalStatus.PENDING,
      },
      include: {
        workOrder: {
          select: {
            id: true,
            workOrderNumber: true,
            facilityName: true,
          },
        },
        addedByTechnician: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }
}
