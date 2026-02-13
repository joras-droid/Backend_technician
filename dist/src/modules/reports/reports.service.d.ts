import { PrismaService } from '../../prisma/prisma.service';
type DurationType = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
export declare class ReportsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getWorkOrderReport(query: any): Promise<{
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
    getTimeSummary(query: any): Promise<{
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
    exportData(type: string, query: any): Promise<{
        contentType: string;
        filename: string;
        data: string;
    }>;
    getDashboardMetrics(duration?: DurationType): Promise<{
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
    getRecentActivities(limit?: number): Promise<{
        items: any[];
        unreadCount: number;
        totalCount: number;
    }>;
}
export {};
