import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { WorkOrderStatus, UserRole } from '@prisma/client';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async getWorkOrderReport(query: any) {
    const {
      startDate,
      endDate,
      status,
      technicianId,
      clientId,
      groupBy,
    } = query;

    const where: any = {};

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) {
        where.createdAt.gte = new Date(startDate);
      }
      if (endDate) {
        where.createdAt.lte = new Date(endDate);
      }
    }

    if (status) {
      where.status = status as WorkOrderStatus;
    }

    if (technicianId) {
      where.technicianId = technicianId;
    }

    if (clientId) {
      where.clientId = clientId;
    }

    const workOrders = await this.prisma.workOrder.findMany({
      where,
      include: {
        technician: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        client: {
          select: {
            id: true,
            name: true,
          },
        },
        timeEntries: {
          where: {
            checkInAt: { not: null },
            checkOutAt: { not: null },
          },
        },
      },
    });

    // Calculate summary
    const totalWorkOrders = workOrders.length;
    const activeWorkOrders = workOrders.filter((wo) => wo.status === 'ACTIVE').length;
    const completedWorkOrders = workOrders.filter((wo) => wo.status === 'COMPLETED').length;
    const paidWorkOrders = workOrders.filter((wo) => wo.status === 'PAID').length;

    let totalRevenue = 0;
    let totalHours = 0;

    workOrders.forEach((wo) => {
      wo.timeEntries.forEach((te) => {
        if (te.checkInAt && te.checkOutAt) {
          const hours =
            (te.checkOutAt.getTime() - te.checkInAt.getTime()) / (1000 * 60 * 60);
          totalHours += hours;
          if (wo.payRate) {
            totalRevenue += hours * wo.payRate;
          }
        }
      });
    });

    // Group by technician
    const byTechnician: any = {};
    workOrders.forEach((wo) => {
      if (wo.technicianId && wo.technician) {
        const techId = wo.technicianId;
        if (!byTechnician[techId]) {
          byTechnician[techId] = {
            technicianId: techId,
            technicianName: `${wo.technician.firstName} ${wo.technician.lastName}`,
            workOrdersCount: 0,
            totalHours: 0,
            totalRevenue: 0,
          };
        }
        byTechnician[techId].workOrdersCount++;
        wo.timeEntries.forEach((te) => {
          if (te.checkInAt && te.checkOutAt) {
            const hours =
              (te.checkOutAt.getTime() - te.checkInAt.getTime()) / (1000 * 60 * 60);
            byTechnician[techId].totalHours += hours;
            if (wo.payRate) {
              byTechnician[techId].totalRevenue += hours * wo.payRate;
            }
          }
        });
      }
    });

    // Group by client
    const byClient: any = {};
    workOrders.forEach((wo) => {
      if (wo.clientId) {
        const clientId = wo.clientId;
        if (!byClient[clientId]) {
          byClient[clientId] = {
            clientId,
            clientName: wo.client?.name || 'Unknown',
            workOrdersCount: 0,
            totalRevenue: 0,
          };
        }
        byClient[clientId].workOrdersCount++;
        wo.timeEntries.forEach((te) => {
          if (te.checkInAt && te.checkOutAt && wo.payRate) {
            const hours =
              (te.checkOutAt.getTime() - te.checkInAt.getTime()) / (1000 * 60 * 60);
            byClient[clientId].totalRevenue += hours * wo.payRate;
          }
        });
      }
    });

    return {
      summary: {
        totalWorkOrders,
        activeWorkOrders,
        completedWorkOrders,
        paidWorkOrders,
        totalRevenue: parseFloat(totalRevenue.toFixed(2)),
        totalHours: parseFloat(totalHours.toFixed(2)),
      },
      byTechnician: Object.values(byTechnician),
      byClient: Object.values(byClient),
      period: {
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
      },
    };
  }

  async getTimeSummary(query: any) {
    const { startDate, endDate, technicianId } = query;

    const where: any = {
      checkInAt: { not: null },
      checkOutAt: { not: null },
    };

    if (startDate || endDate) {
      where.checkInAt = {};
      if (startDate) {
        where.checkInAt.gte = new Date(startDate);
      }
      if (endDate) {
        where.checkInAt.lte = new Date(endDate);
      }
    }

    if (technicianId) {
      where.technicianId = technicianId;
    }

    const timeEntries = await this.prisma.timeEntry.findMany({
      where,
      include: {
        technician: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        workOrder: {
          select: {
            id: true,
            payRate: true,
          },
        },
      },
    });

    let totalHours = 0;
    const technicians: any = {};

    timeEntries.forEach((te) => {
      if (te.checkInAt && te.checkOutAt) {
        const hours =
          (te.checkOutAt.getTime() - te.checkInAt.getTime()) / (1000 * 60 * 60);
        totalHours += hours;

        const techId = te.technicianId;
        if (!technicians[techId]) {
          technicians[techId] = {
            technicianId: techId,
            technicianName: `${te.technician.firstName} ${te.technician.lastName}`,
            totalHours: 0,
            workOrdersCount: 0,
            earnings: 0,
          };
        }
        technicians[techId].totalHours += hours;
        technicians[techId].workOrdersCount++;
        if (te.workOrder.payRate) {
          technicians[techId].earnings += hours * te.workOrder.payRate;
        }
      }
    });

    const technicianList = Object.values(technicians).map((tech: any) => ({
      ...tech,
      totalHours: parseFloat(tech.totalHours.toFixed(2)),
      averageHoursPerWorkOrder: parseFloat(
        (tech.totalHours / tech.workOrdersCount).toFixed(2),
      ),
      earnings: parseFloat(tech.earnings.toFixed(2)),
    }));

    const workOrdersCount = new Set(timeEntries.map((te) => te.workOrderId)).size;

    return {
      summary: {
        totalHours: parseFloat(totalHours.toFixed(2)),
        totalWorkOrders: workOrdersCount,
        averageHoursPerWorkOrder: parseFloat(
          (totalHours / workOrdersCount || 0).toFixed(2),
        ),
      },
      technicians: technicianList,
      period: {
        startDate: startDate ? new Date(startDate) : null,
        endDate: endDate ? new Date(endDate) : null,
      },
    };
  }

  async exportData(type: string, query: any) {
    // This is a simplified implementation
    // In production, use a library like csv-writer or exceljs
    const { startDate, endDate } = query;

    const where: any = {};
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) {
        where.createdAt.gte = new Date(startDate);
      }
      if (endDate) {
        where.createdAt.lte = new Date(endDate);
      }
    }

    switch (type) {
      case 'work-orders':
        const workOrders = await this.prisma.workOrder.findMany({
          where,
          include: {
            technician: true,
            client: true,
          },
        });

        // Generate CSV (simplified)
        const csvHeaders = [
          'workOrderNumber',
          'scheduledAt',
          'facilityName',
          'technician',
          'status',
          'estimatedHours',
          'payRate',
        ];
        const csvRows = workOrders.map((wo) => [
          wo.workOrderNumber,
          wo.scheduledAt.toISOString(),
          wo.facilityName,
          wo.technician
            ? `${wo.technician.firstName} ${wo.technician.lastName}`
            : '',
          wo.status,
          wo.estimatedHours || '',
          wo.payRate || '',
        ]);

        return {
          contentType: 'text/csv',
          filename: `work-orders-${new Date().toISOString().split('T')[0]}.csv`,
          data: [csvHeaders.join(','), ...csvRows.map((row) => row.join(','))].join('\n'),
        };

      default:
        throw new Error('Invalid export type');
    }
  }
}
