import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CheckInDto,
  CheckOutDto,
  EditTimeEntryDto,
} from '../../common/dto/time-entry.dto';

const MILES_TO_KM = 1.609344;
const CHECK_IN_RADIUS_MILES = 1;

function haversineDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

@Injectable()
export class TimeEntriesService {
  constructor(private readonly prisma: PrismaService) {}

  async checkIn(workOrderId: string, technicianId: string, dto: CheckInDto) {
    // Verify work order exists and is assigned to technician
    const workOrder = await this.prisma.workOrder.findUnique({
      where: { id: workOrderId },
    });

    if (!workOrder) {
      throw new NotFoundException('Work order not found');
    }

    if (workOrder.technicianId !== technicianId) {
      throw new ForbiddenException('Work order is not assigned to you');
    }

    // Validate technician is within 1 mile of facility (when facility coordinates exist)
    if (workOrder.facilityLat != null && workOrder.facilityLng != null) {
      const distanceKm = haversineDistanceKm(
        workOrder.facilityLat,
        workOrder.facilityLng,
        dto.checkInLat,
        dto.checkInLng,
      );
      const distanceMiles = distanceKm / MILES_TO_KM;
      if (distanceMiles > CHECK_IN_RADIUS_MILES) {
        throw new BadRequestException(
          `Check-in denied: You must be within ${CHECK_IN_RADIUS_MILES} mile(s) of the facility. Current distance: ${distanceMiles.toFixed(2)} miles.`,
        );
      }
    }

    // Check if already checked in
    const existingEntry = await this.prisma.timeEntry.findFirst({
      where: {
        workOrderId,
        technicianId,
        checkInAt: { not: null },
        checkOutAt: null,
      },
    });

    if (existingEntry) {
      throw new BadRequestException('Already checked in. Please check out first.');
    }

    // Create time entry
    const timeEntry = await this.prisma.timeEntry.create({
      data: {
        workOrderId,
        technicianId,
        checkInAt: new Date(),
        checkInLat: dto.checkInLat,
        checkInLng: dto.checkInLng,
      },
      include: {
        technician: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return timeEntry;
  }

  async checkOut(
    workOrderId: string,
    callerId: string,
    callerRole: string,
    dto: CheckOutDto,
  ) {
    const isAdminOrManager =
      callerRole === 'ADMIN' || callerRole === 'MANAGER';

    // Technicians must provide location; Admin/Manager can check out without it
    if (!isAdminOrManager && (dto.checkOutLat == null || dto.checkOutLng == null)) {
      throw new BadRequestException(
        'Technicians must provide check-out location (checkOutLat and checkOutLng)',
      );
    }

    // For Admin/Manager: find active time entry for the work order (any technician)
    // For Technician: find their own active time entry
    const whereClause: any = {
      workOrderId,
      checkInAt: { not: null },
      checkOutAt: null,
    };

    if (isAdminOrManager) {
      // Get the technician assigned to this work order
      const workOrder = await this.prisma.workOrder.findUnique({
        where: { id: workOrderId },
      });
      if (!workOrder) {
        throw new NotFoundException('Work order not found');
      }
      if (!workOrder.technicianId) {
        throw new BadRequestException('Work order has no assigned technician');
      }
      whereClause.technicianId = workOrder.technicianId;
    } else {
      whereClause.technicianId = callerId;
    }

    const timeEntry = await this.prisma.timeEntry.findFirst({
      where: whereClause,
    });

    if (!timeEntry) {
      throw new NotFoundException('No active check-in found. Please check in first.');
    }

    // Update with check-out
    const checkOutAt = new Date();
    const updated = await this.prisma.timeEntry.update({
      where: { id: timeEntry.id },
      data: {
        checkOutAt,
        checkOutLat: dto.checkOutLat ?? null,
        checkOutLng: dto.checkOutLng ?? null,
      },
      include: {
        technician: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    // Calculate total hours
    const totalHours =
      (checkOutAt.getTime() - timeEntry.checkInAt!.getTime()) / (1000 * 60 * 60);

    return {
      ...updated,
      totalHours: parseFloat(totalHours.toFixed(2)),
    };
  }

  async findAllForWorkOrder(workOrderId: string) {
    // Verify work order exists
    const workOrder = await this.prisma.workOrder.findUnique({
      where: { id: workOrderId },
    });

    if (!workOrder) {
      throw new NotFoundException('Work order not found');
    }

    const timeEntries = await this.prisma.timeEntry.findMany({
      where: { workOrderId },
      include: {
        technician: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        edits: {
          include: {
            editedBy: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
      orderBy: { checkInAt: 'desc' },
    });

    // Calculate total hours for each entry
    return timeEntries.map((entry) => {
      let totalHours = null;
      if (entry.checkInAt && entry.checkOutAt) {
        totalHours =
          (entry.checkOutAt.getTime() - entry.checkInAt.getTime()) /
          (1000 * 60 * 60);
        totalHours = parseFloat(totalHours.toFixed(2));
      }
      return {
        ...entry,
        totalHours,
      };
    });
  }

  async edit(id: string, dto: EditTimeEntryDto, adminId: string) {
    // Find time entry
    const timeEntry = await this.prisma.timeEntry.findUnique({
      where: { id },
    });

    if (!timeEntry) {
      throw new NotFoundException('Time entry not found');
    }

    // Store original values for audit
    const edits: any[] = [];

    if (dto.checkInAt !== undefined) {
      const originalValue = timeEntry.checkInAt
        ? timeEntry.checkInAt.toISOString()
        : null;
      const updatedValue = dto.checkInAt;

      edits.push({
        timeEntryId: id,
        field: 'checkInAt',
        originalValue,
        updatedValue,
        editedById: adminId,
      });
    }

    if (dto.checkOutAt !== undefined) {
      const originalValue = timeEntry.checkOutAt
        ? timeEntry.checkOutAt.toISOString()
        : null;
      const updatedValue = dto.checkOutAt;

      edits.push({
        timeEntryId: id,
        field: 'checkOutAt',
        originalValue,
        updatedValue,
        editedById: adminId,
      });
    }

    // Update time entry
    const updateData: any = {};
    if (dto.checkInAt !== undefined) {
      updateData.checkInAt = new Date(dto.checkInAt);
    }
    if (dto.checkOutAt !== undefined) {
      updateData.checkOutAt = new Date(dto.checkOutAt);
    }

    const updated = await this.prisma.timeEntry.update({
      where: { id },
      data: updateData,
      include: {
        technician: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        edits: {
          include: {
            editedBy: {
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

    // Create audit records
    if (edits.length > 0) {
      await this.prisma.timeEntryEdit.createMany({
        data: edits,
      });

      // Create notification for technician
      await this.prisma.notification.create({
        data: {
          userId: timeEntry.technicianId,
          type: 'TIME_ENTRY_EDITED',
          channel: 'PUSH',
          title: 'Time Entry Edited',
          message: `Your time entry for work order has been edited. Reason: ${dto.reason}`,
        },
      });
    }

    // Calculate total hours
    let totalHours = null;
    if (updated.checkInAt && updated.checkOutAt) {
      totalHours =
        (updated.checkOutAt.getTime() - updated.checkInAt.getTime()) /
        (1000 * 60 * 60);
      totalHours = parseFloat(totalHours.toFixed(2));
    }

    return {
      ...updated,
      totalHours,
      editReason: dto.reason,
    };
  }
}
