import { Response } from 'express';
import { ReportsService } from './reports.service';
import { AuthenticatedRequest } from '../../common/interfaces/request.interface';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
    getWorkOrderReport(query: any, req: AuthenticatedRequest): Promise<{
        summary: {
            totalWorkOrders: number;
            activeWorkOrders: number;
            completedWorkOrders: number;
            paidWorkOrders: number;
            totalRevenue: number;
            totalHours: number;
        };
        byTechnician: unknown[];
        byClient: unknown[];
        period: {
            startDate: Date | null;
            endDate: Date | null;
        };
    }>;
    getTimeSummary(query: any, req: AuthenticatedRequest): Promise<{
        summary: {
            totalHours: number;
            totalWorkOrders: number;
            averageHoursPerWorkOrder: number;
        };
        technicians: any[];
        period: {
            startDate: Date | null;
            endDate: Date | null;
        };
    }>;
    getMetrics(duration: string | undefined, req: AuthenticatedRequest): Promise<{
        dashboardMetrics: {
            statCards: {
                id: string;
                title: string;
                subtitle: string;
                value: string;
                change: string;
                isPositive: boolean;
            }[];
            lineChart: {
                workOrderTrends: {
                    labels: string[];
                    datasets: {
                        label: string;
                        data: any[];
                    }[];
                    comparison: {
                        vsLastWeek: number;
                        vsLastMonth: number;
                        vsLastYear: number;
                    };
                };
            };
            pieCharts: {
                workOrderDistribution: {
                    byStatus: {
                        label: string;
                        value: number;
                        color: string;
                        count: number;
                    }[];
                };
            };
            performanceMetrics: {
                kpis: ({
                    label: string;
                    value: number;
                    unit?: undefined;
                } | {
                    label: string;
                    value: number;
                    unit: string;
                })[];
            };
            recentActivities: {
                items: any[];
                unreadCount: number;
                totalCount: number;
            };
        };
    }>;
    getRecentActivity(limit: string | undefined, req: AuthenticatedRequest): Promise<{
        items: any[];
        unreadCount: number;
        totalCount: number;
    }>;
    exportData(query: any, res: Response, req: AuthenticatedRequest): Promise<void>;
    getIndividualPerformance(userId: string, query: any, req: AuthenticatedRequest): Promise<{
        user: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            role: import(".prisma/client").$Enums.UserRole;
            profileImageUrl: string | null;
        };
        summary: {
            workOrdersTotal: number;
            workOrdersCompleted: number;
            workOrdersActive: number;
            workOrdersPaid: number;
            totalHours: number;
            totalEarnings: number;
            avgHoursPerOrder: number;
        };
        lineChart: {
            labels: string[];
            datasets: {
                label: string;
                data: any[];
            }[];
        };
        pieChart: {
            byStatus: {
                label: string;
                value: number;
                color: string;
            }[];
        };
        period: {
            startDate: Date;
            endDate: Date;
        };
    }>;
}
