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
    exportData(query: any, res: Response): Promise<void>;
}
