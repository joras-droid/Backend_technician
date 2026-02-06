import { WorkOrdersService } from './work-orders.service';
import { S3Service } from '../common/services/s3.service';
import { RequestAttachmentPresignedUrlDto, CreateAttachmentDto } from '../common/dto/work-order.dto';
import { PresignedUrlResponseDto } from '../common/dto/auth.dto';
import { AuthenticatedRequest } from '../common/interfaces/request.interface';
export declare class WorkOrdersController {
    private readonly workOrdersService;
    private readonly s3Service;
    constructor(workOrdersService: WorkOrdersService, s3Service: S3Service);
    getForTechnician(technicianId: string): import(".prisma/client").Prisma.PrismaPromise<({
        client: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string | null;
            phone: string | null;
            address: string | null;
            name: string;
            notes: string | null;
        } | null;
        equipment: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            quantity: number;
            cost: number | null;
            vendor: string | null;
            workOrderId: string;
        }[];
        technician: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            phone: string | null;
        } | null;
        attachments: {
            description: string | null;
            id: string;
            createdAt: Date;
            type: string | null;
            workOrderId: string;
            url: string;
        }[];
    } & {
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
        clientId: string | null;
        technicianId: string | null;
        templateId: string | null;
        invoiceNumber: string | null;
    })[]>;
    getOne(id: string): import(".prisma/client").Prisma.Prisma__WorkOrderClient<({
        client: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            email: string | null;
            phone: string | null;
            address: string | null;
            name: string;
            notes: string | null;
        } | null;
        timeEntries: ({
            technician: {
                id: string;
                firstName: string;
                lastName: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            technicianId: string;
            workOrderId: string;
            checkInAt: Date | null;
            checkInLat: number | null;
            checkInLng: number | null;
            checkOutAt: Date | null;
            checkOutLat: number | null;
            checkOutLng: number | null;
        })[];
        equipment: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            quantity: number;
            cost: number | null;
            vendor: string | null;
            workOrderId: string;
        }[];
        technician: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            phone: string | null;
            profileImageUrl: string | null;
        } | null;
        attachments: {
            description: string | null;
            id: string;
            createdAt: Date;
            type: string | null;
            workOrderId: string;
            url: string;
        }[];
    } & {
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
        clientId: string | null;
        technicianId: string | null;
        templateId: string | null;
        invoiceNumber: string | null;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    getAttachmentPresignedUrl(workOrderId: string, dto: Omit<RequestAttachmentPresignedUrlDto, 'workOrderId'>): Promise<PresignedUrlResponseDto>;
    createAttachment(workOrderId: string, dto: CreateAttachmentDto, req: AuthenticatedRequest): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        type: string | null;
        workOrderId: string;
        url: string;
    }>;
}
