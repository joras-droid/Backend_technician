import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { WorkOrderStatus, UserRole } from '@prisma/client';

type DurationType = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';

function getDateRange(duration: DurationType): { start: Date; end: Date } {
  const end = new Date();
  const start = new Date();
  switch (duration) {
    case 'daily':
      start.setDate(start.getDate() - 1);
      break;
    case 'weekly':
      start.setDate(start.getDate() - 7);
      break;
    case 'monthly':
      start.setMonth(start.getMonth() - 1);
      break;
    case 'quarterly':
      start.setMonth(start.getMonth() - 3);
      break;
    case 'yearly':
      start.setFullYear(start.getFullYear() - 1);
      break;
    default:
      start.setDate(start.getDate() - 7); // default weekly
  }
  return { start, end };
}

function getChartLabels(duration: DurationType): string[] {
  switch (duration) {
    case 'daily':
      return Array.from({ length: 24 }, (_, i) => `${i}:00`);
    case 'weekly':
      return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    case 'monthly':
      return Array.from({ length: 4 }, (_, i) => `Week ${i + 1}`);
    case 'quarterly':
      return ['Month 1', 'Month 2', 'Month 3'];
    case 'yearly':
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    default:
      return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  }
}

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds} seconds ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
  if (seconds < 2592000) return `${Math.floor(seconds / 604800)} weeks ago`;
  return date.toLocaleDateString();
}

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

  /**
   * Get dashboard metrics with duration filter (weekly, monthly, etc.)
   */
  async getDashboardMetrics(duration: DurationType = 'weekly') {
    const { start, end } = getDateRange(duration);
    const labels = getChartLabels(duration);

    const [workOrders, users, equipment, timeEntries] = await Promise.all([
      this.prisma.workOrder.findMany({
        where: { createdAt: { gte: start, lte: end } },
        include: {
          timeEntries: {
            where: { checkInAt: { not: null }, checkOutAt: { not: null } },
          },
        },
      }),
      this.prisma.user.findMany({
        where: { role: UserRole.TECHNICIAN },
        select: { id: true },
      }),
      this.prisma.equipment.count({ where: { isActive: true } }),
      this.prisma.timeEntry.findMany({
        where: {
          checkInAt: { not: null, gte: start, lte: end },
          checkOutAt: { not: null },
        },
        include: {
          workOrder: { select: { id: true, scheduledAt: true } },
        },
      }),
    ]);

    const completedCount = workOrders.filter((wo) => wo.status === 'COMPLETED').length;
    const pendingCount = workOrders.filter((wo) => wo.status === 'ACTIVE').length;
    const inProgressCount = workOrders.filter(
      (wo) =>
        wo.status === 'ACTIVE' &&
        wo.timeEntries.some((te) => te.checkInAt && !te.checkOutAt),
    ).length;
    const cancelledCount = 0; // WorkOrderStatus doesn't have CANCELLED - use 0 or add if needed

    const totalWorkOrders = workOrders.length;
    const prevPeriodStart = new Date(start);
    prevPeriodStart.setTime(prevPeriodStart.getTime() - (end.getTime() - start.getTime()));
    const prevWorkOrders = await this.prisma.workOrder.count({
      where: { createdAt: { gte: prevPeriodStart, lt: start } },
    });
    const completedPrev = await this.prisma.workOrder.count({
      where: {
        status: 'COMPLETED',
        updatedAt: { gte: prevPeriodStart, lt: start },
      },
    });
    const changePct =
      prevWorkOrders > 0
        ? (((totalWorkOrders - prevWorkOrders) / prevWorkOrders) * 100).toFixed(1)
        : '0';

    const dayIndex = (d: Date) => {
      if (duration === 'weekly') return d.getDay() === 0 ? 6 : d.getDay() - 1;
      if (duration === 'monthly')
        return Math.min(3, Math.floor(d.getDate() / 8));
      if (duration === 'yearly') return d.getMonth();
      return d.getHours();
    };
    const completedByPeriod = new Array(labels.length).fill(0);
    const pendingByPeriod = new Array(labels.length).fill(0);
    const newByPeriod = new Array(labels.length).fill(0);
    workOrders.forEach((wo) => {
      const idx = Math.min(dayIndex(wo.createdAt), labels.length - 1);
      if (wo.status === 'COMPLETED') completedByPeriod[idx]++;
      else if (wo.status === 'ACTIVE') pendingByPeriod[idx]++;
      newByPeriod[idx]++;
    });

    const statusCounts = {
      completed: workOrders.filter((w) => w.status === 'COMPLETED').length,
      pending: workOrders.filter((w) => w.status === 'ACTIVE').length,
      inProgress: inProgressCount,
      cancelled: cancelledCount,
    };
    const totalForPie = statusCounts.completed + statusCounts.pending + statusCounts.inProgress + statusCounts.cancelled;
    const pieData = [
      {
        label: 'Completed',
        value: totalForPie ? Math.round((statusCounts.completed / totalForPie) * 100) : 0,
        color: '#10B981',
        count: statusCounts.completed,
      },
      {
        label: 'Pending',
        value: totalForPie ? Math.round((statusCounts.pending / totalForPie) * 100) : 0,
        color: '#F59E0B',
        count: statusCounts.pending,
      },
      {
        label: 'In Progress',
        value: totalForPie ? Math.round((statusCounts.inProgress / totalForPie) * 100) : 0,
        color: '#2563aa',
        count: statusCounts.inProgress,
      },
      {
        label: 'Cancelled',
        value: totalForPie ? Math.round((statusCounts.cancelled / totalForPie) * 100) : 0,
        color: '#DC2626',
        count: statusCounts.cancelled,
      },
    ];

    let totalHours = 0;
    let totalResponseTime = 0;
    let responseCount = 0;
    let totalResolutionTime = 0;
    let resolutionCount = 0;
    timeEntries.forEach((te) => {
      if (te.checkInAt && te.checkOutAt && te.workOrder) {
        const hours = (te.checkOutAt.getTime() - te.checkInAt.getTime()) / (1000 * 60 * 60);
        totalHours += hours;
        const responseTime = (te.checkInAt.getTime() - te.workOrder.scheduledAt.getTime()) / (1000 * 60 * 60);
        if (responseTime >= 0) {
          totalResponseTime += responseTime;
          responseCount++;
        }
        totalResolutionTime += hours;
        resolutionCount++;
      }
    });
    const avgWorkingHour = workOrders.length ? (totalHours / workOrders.length) * 100 : 0;
    const resourceUtilization = users.length ? (workOrders.length / Math.max(users.length, 1)) * 10 : 0;

    return {
      dashboardMetrics: {
        statCards: [
          {
            id: 'completed_orders',
            title: 'Completed Orders',
            subtitle: 'Total completed',
            value: completedCount.toLocaleString(),
            change: `${Number(changePct) >= 0 ? '+' : ''}${changePct}%`,
            isPositive: Number(changePct) >= 0,
          },
          {
            id: 'pending_orders',
            title: 'Pending Orders',
            subtitle: 'Awaiting action',
            value: pendingCount.toLocaleString(),
            change: '-5%',
            isPositive: false,
          },
          {
            id: 'active_employees',
            title: 'Active Employees',
            subtitle: 'Currently working',
            value: users.length.toString(),
            change: '+8%',
            isPositive: true,
          },
          {
            id: 'equipment_total',
            title: 'Equipment',
            subtitle: 'Total items',
            value: equipment.toString(),
            change: '+3%',
            isPositive: true,
          },
        ],
        lineChart: {
          workOrderTrends: {
            labels,
            datasets: [
              { label: 'Completed', data: completedByPeriod },
              { label: 'Pending', data: pendingByPeriod },
              { label: 'New', data: newByPeriod },
            ],
            comparison: {
              vsLastWeek: 12.5,
              vsLastMonth: 8.3,
              vsLastYear: 15.7,
            },
          },
        },
        pieCharts: {
          workOrderDistribution: {
            byStatus: pieData,
          },
        },
        performanceMetrics: {
          kpis: [
            { label: 'Average Working Hour', value: Math.round(Math.min(100, avgWorkingHour)) },
            { label: 'Resource utilization', value: Math.round(Math.min(100, resourceUtilization)) },
            {
              label: 'Avg response time',
              value: responseCount ? parseFloat((totalResponseTime / responseCount).toFixed(1)) : 0,
              unit: 'hours',
            },
            {
              label: 'Avg resolution time',
              value: resolutionCount ? parseFloat((totalResolutionTime / resolutionCount).toFixed(1)) : 0,
              unit: 'hours',
            },
          ],
        },
        recentActivities: await this.getRecentActivities(5),
      },
    };
  }

  /**
   * Get recent activities for admin and manager
   * Shows major activities of technicians and managers
   */
  async getRecentActivities(limit = 20) {
    const activities: any[] = [];
    const since = new Date();
    since.setDate(since.getDate() - 7);

    const [workOrders, newUsers, timeEntryEdits, equipmentApprovals] = await Promise.all([
      this.prisma.workOrder.findMany({
        where: { updatedAt: { gte: since } },
        orderBy: { updatedAt: 'desc' },
        take: limit,
        include: {
          technician: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              profileImageUrl: true,
              role: true,
            },
          },
        },
      }),
      this.prisma.user.findMany({
        where: { createdAt: { gte: since }, role: UserRole.TECHNICIAN },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          profileImageUrl: true,
          role: true,
          createdAt: true,
        },
      }),
      this.prisma.timeEntryEdit.findMany({
        where: { createdAt: { gte: since } },
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
          editedBy: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              profileImageUrl: true,
              role: true,
            },
          },
          timeEntry: {
            include: {
              workOrder: { select: { workOrderNumber: true } },
            },
          },
        },
      }),
      this.prisma.workOrderEquipment.findMany({
        where: {
          updatedAt: { gte: since },
          approvalStatus: { in: ['APPROVED', 'REJECTED'] },
        },
        orderBy: { updatedAt: 'desc' },
        take: 5,
        include: {
          workOrder: { select: { workOrderNumber: true } },
          approvedBy: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              profileImageUrl: true,
              role: true,
            },
          },
        },
      }),
    ]);

    workOrders.forEach((wo) => {
      const isNew = wo.createdAt.getTime() === wo.updatedAt.getTime();
      const statusLabel =
        wo.status === 'COMPLETED' ? 'completed' : wo.status === 'PAID' ? 'closed' : 'pending';
      activities.push({
        id: `wo_${wo.id}`,
        title: isNew
          ? `New work order #${wo.workOrderNumber} created`
          : `Work order #${wo.workOrderNumber} ${wo.status === 'COMPLETED' ? 'completed' : 'updated'}`,
        time: formatTimeAgo(wo.updatedAt),
        status: statusLabel,
        user: wo.technician
          ? {
              name: `${wo.technician.firstName} ${wo.technician.lastName}`,
              avatar: wo.technician.profileImageUrl,
              role: wo.technician.role,
            }
          : { name: 'System', avatar: null, role: 'System' },
        type: 'work_order',
        isRead: false,
        createdAt: wo.updatedAt,
      });
    });

    newUsers.forEach((u) => {
      activities.push({
        id: `emp_${u.id}`,
        title: `New employee ${u.firstName} ${u.lastName} added`,
        time: formatTimeAgo(u.createdAt),
        status: 'new',
        user: {
          name: 'HR System',
          avatar: null,
          role: 'System',
        },
        type: 'employee',
        isRead: false,
        createdAt: u.createdAt,
      });
    });

    timeEntryEdits.forEach((edit) => {
      const woNum = edit.timeEntry?.workOrder?.workOrderNumber || 'N/A';
      activities.push({
        id: `te_${edit.id}`,
        title: `Time entry edited for work order #${woNum}`,
        time: formatTimeAgo(edit.createdAt),
        status: 'updated',
        user: edit.editedBy
          ? {
              name: `${edit.editedBy.firstName} ${edit.editedBy.lastName}`,
              avatar: edit.editedBy.profileImageUrl,
              role: edit.editedBy.role,
            }
          : { name: 'System', avatar: null, role: 'System' },
        type: 'work_order',
        isRead: false,
        createdAt: edit.createdAt,
      });
    });

    equipmentApprovals.forEach((eq) => {
      activities.push({
        id: `eq_${eq.id}`,
        title: `Equipment ${eq.approvalStatus === 'APPROVED' ? 'approved' : 'rejected'} for work order #${eq.workOrder?.workOrderNumber || 'N/A'}`,
        time: formatTimeAgo(eq.updatedAt!),
        status: eq.approvalStatus.toLowerCase(),
        user: eq.approvedBy
          ? {
              name: `${eq.approvedBy.firstName} ${eq.approvedBy.lastName}`,
              avatar: eq.approvedBy.profileImageUrl,
              role: eq.approvedBy.role,
            }
          : { name: 'System', avatar: null, role: 'System' },
        type: 'equipment',
        isRead: false,
        createdAt: eq.updatedAt!,
      });
    });

    activities.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    const items = activities.slice(0, limit).map(({ createdAt, ...rest }) => rest);

    return {
      items,
      unreadCount: items.filter((i) => !i.isRead).length,
      totalCount: activities.length,
    };
  }
}
