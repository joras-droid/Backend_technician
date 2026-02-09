import { WorkOrdersService } from './work-orders.service';
import { S3Service } from '../common/services/s3.service';
import { RequestAttachmentPresignedUrlDto, CreateAttachmentDto, ListWorkOrdersQueryDto } from '../common/dto/work-order.dto';
import { PresignedUrlResponseDto } from '../common/dto/auth.dto';
import { AuthenticatedRequest } from '../common/interfaces/request.interface';
export declare class WorkOrdersController {
    private readonly workOrdersService;
    private readonly s3Service;
    constructor(workOrdersService: WorkOrdersService, s3Service: S3Service);
    getAllWorkOrders(query: ListWorkOrdersQueryDto): Promise<{
        data: ({
            client: {
                id: string;
                name: string;
                email: string | null;
                phone: string | null;
            } | null;
            technician: {
                id: string;
                email: string;
                phone: string | null;
                firstName: string;
                lastName: string;
                profileImageUrl: string | null;
            } | null;
            equipment: {
                createdAt: Date;
                updatedAt: Date;
                id: string;
                name: string;
                workOrderId: string;
                quantity: number;
                cost: number | null;
                vendor: string | null;
            }[];
            attachments: {
                createdAt: Date;
                id: string;
                workOrderId: string;
                url: string;
                type: string | null;
                description: string | null;
            }[];
        } & {
            scheduledAt: Date;
            createdAt: Date;
            updatedAt: Date;
            workOrderNumber: string;
            id: string;
            estimatedHours: number | null;
            payRate: number | null;
            facilityName: string;
            facilityAddress: string;
            pointOfContact: string | null;
            tasks: string | null;
            notes: string | null;
            status: import(".prisma/client").$Enums.WorkOrderStatus;
            invoiceNumber: string | null;
            clientId: string | null;
            technicianId: string | null;
            templateId: string | null;
        })[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getMyWorkOrders(req: AuthenticatedRequest): import(".prisma/client").Prisma.PrismaPromise<({
        client: {
            createdAt: Date;
            updatedAt: Date;
            id: string;
            notes: string | null;
            name: string;
            email: string | null;
            phone: string | null;
            address: string | null;
        } | null;
        technician: {
            id: string;
            email: string;
            phone: string | null;
            firstName: string;
            lastName: string;
        } | null;
        equipment: {
            createdAt: Date;
            updatedAt: Date;
            id: string;
            name: string;
            workOrderId: string;
            quantity: number;
            cost: number | null;
            vendor: string | null;
        }[];
        attachments: {
            createdAt: Date;
            id: string;
            workOrderId: string;
            url: string;
            type: string | null;
            description: string | null;
        }[];
    } & {
        scheduledAt: Date;
        createdAt: Date;
        updatedAt: Date;
        workOrderNumber: string;
        id: string;
        estimatedHours: number | null;
        payRate: number | null;
        facilityName: string;
        facilityAddress: string;
        pointOfContact: string | null;
        tasks: string | null;
        notes: string | null;
        status: import(".prisma/client").$Enums.WorkOrderStatus;
        invoiceNumber: string | null;
        clientId: string | null;
        technicianId: string | null;
        templateId: string | null;
    })[]>;
    getForTechnician(technicianId: string): import(".prisma/client").Prisma.PrismaPromise<({
        client: {
            createdAt: Date;
            updatedAt: Date;
            id: string;
            notes: string | null;
            name: string;
            email: string | null;
            phone: string | null;
            address: string | null;
        } | null;
        technician: {
            id: string;
            email: string;
            phone: string | null;
            firstName: string;
            lastName: string;
        } | null;
        equipment: {
            createdAt: Date;
            updatedAt: Date;
            id: string;
            name: string;
            workOrderId: string;
            quantity: number;
            cost: number | null;
            vendor: string | null;
        }[];
        attachments: {
            createdAt: Date;
            id: string;
            workOrderId: string;
            url: string;
            type: string | null;
            description: string | null;
        }[];
    } & {
        scheduledAt: Date;
        createdAt: Date;
        updatedAt: Date;
        workOrderNumber: string;
        id: string;
        estimatedHours: number | null;
        payRate: number | null;
        facilityName: string;
        facilityAddress: string;
        pointOfContact: string | null;
        tasks: string | null;
        notes: string | null;
        status: import(".prisma/client").$Enums.WorkOrderStatus;
        invoiceNumber: string | null;
        clientId: string | null;
        technicianId: string | null;
        templateId: string | null;
    })[]>;
    getOne(id: string): import(".prisma/client").Prisma.Prisma__WorkOrderClient<({
        client: {
            createdAt: Date;
            updatedAt: Date;
            id: string;
            notes: string | null;
            name: string;
            email: string | null;
            phone: string | null;
            address: string | null;
        } | null;
        technician: {
            id: string;
            email: string;
            phone: string | null;
            firstName: string;
            lastName: string;
            profileImageUrl: string | null;
        } | null;
        equipment: {
            createdAt: Date;
            updatedAt: Date;
            id: string;
            name: string;
            workOrderId: string;
            quantity: number;
            cost: number | null;
            vendor: string | null;
        }[];
        attachments: {
            createdAt: Date;
            id: string;
            workOrderId: string;
            url: string;
            type: string | null;
            description: string | null;
        }[];
        timeEntries: ({
            technician: {
                id: string;
                firstName: string;
                lastName: string;
            };
        } & {
            createdAt: Date;
            updatedAt: Date;
            id: string;
            technicianId: string;
            workOrderId: string;
            checkInAt: Date | null;
            checkInLat: number | null;
            checkInLng: number | null;
            checkOutAt: Date | null;
            checkOutLat: number | null;
            checkOutLng: number | null;
        })[];
    } & {
        scheduledAt: Date;
        createdAt: Date;
        updatedAt: Date;
        workOrderNumber: string;
        id: string;
        estimatedHours: number | null;
        payRate: number | null;
        facilityName: string;
        facilityAddress: string;
        pointOfContact: string | null;
        tasks: string | null;
        notes: string | null;
        status: import(".prisma/client").$Enums.WorkOrderStatus;
        invoiceNumber: string | null;
        clientId: string | null;
        technicianId: string | null;
        templateId: string | null;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    getAttachmentPresignedUrl(workOrderId: string, dto: Omit<RequestAttachmentPresignedUrlDto, 'workOrderId'>): Promise<PresignedUrlResponseDto>;
    createAttachment(workOrderId: string, dto: CreateAttachmentDto, req: AuthenticatedRequest): Promise<{
        createdAt: Date;
        id: string;
        workOrderId: string;
        url: string;
        type: string | null;
        description: string | null;
    }>;
}
