import { PrismaService } from '../../prisma/prisma.service';
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
}
