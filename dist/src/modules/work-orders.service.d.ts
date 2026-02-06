import { PrismaService } from '../prisma/prisma.service';
export declare class WorkOrdersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAllForTechnician(technicianId: string): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        workOrderNumber: string;
        scheduledAt: Date;
        estimatedHours: number | null;
        payRate: number | null;
        facilityName: string;
        facilityAddress: string;
        pointOfContact: string | null;
        tasks: string | null;
        status: import(".prisma/client").$Enums.WorkOrderStatus;
        invoiceNumber: string | null;
        clientId: string | null;
        technicianId: string | null;
        templateId: string | null;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__WorkOrderClient<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        notes: string | null;
        workOrderNumber: string;
        scheduledAt: Date;
        estimatedHours: number | null;
        payRate: number | null;
        facilityName: string;
        facilityAddress: string;
        pointOfContact: string | null;
        tasks: string | null;
        status: import(".prisma/client").$Enums.WorkOrderStatus;
        invoiceNumber: string | null;
        clientId: string | null;
        technicianId: string | null;
        templateId: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
