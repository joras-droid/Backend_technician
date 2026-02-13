import { Response } from 'express';
import { ReportsService } from './reports.service';
export declare class ReportsController {
    private readonly reportsService;
    constructor(reportsService: ReportsService);
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
    getMetrics(duration?: string): Promise<{
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
    getRecentActivity(limit?: string): Promise<{
        items: any[];
        unreadCount: number;
        totalCount: number;
    }>;
    exportData(query: any, res: Response): Promise<void>;
}
