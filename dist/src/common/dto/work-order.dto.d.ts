import { WorkOrderStatus } from '@prisma/client';
export declare class CreateWorkOrderEquipmentDto {
    name: string;
    quantity: number;
    cost: number;
    vendor?: string;
    equipmentId?: string;
}
export declare class CreateWorkOrderDto {
    workOrderNumber?: string;
    scheduledAt: string;
    estimatedHours?: number;
    payRate?: number;
    flatRate?: number;
    facilityName: string;
    facilityAddress: string;
    pointOfContact?: string;
    tasks?: string;
    notes?: string;
    status?: WorkOrderStatus;
    clientId?: string;
    technicianId?: string;
    templateId?: string;
    equipment?: CreateWorkOrderEquipmentDto[];
}
export declare class DuplicateWorkOrderDto {
    scheduledAt?: string;
    technicianId?: string;
    status?: WorkOrderStatus;
}
export declare class UpdateWorkOrderDto {
    scheduledAt?: string;
    estimatedHours?: number;
    payRate?: number;
    flatRate?: number;
    facilityName?: string;
    facilityAddress?: string;
    pointOfContact?: string;
    tasks?: string;
    notes?: string;
    status?: WorkOrderStatus;
    clientId?: string;
    technicianId?: string;
    invoiceNumber?: string;
    beforeWorkPhotos?: string[];
    afterWorkPhotos?: string[];
}
export declare class CreateAttachmentDto {
    workOrderId: string;
    url: string;
    type?: string;
    description?: string;
}
export declare class RequestAttachmentPresignedUrlDto {
    workOrderId: string;
    fileName: string;
    contentType: string;
    attachmentType: 'photo' | 'receipt';
    description?: string;
}
export declare class ListWorkOrdersQueryDto {
    status?: WorkOrderStatus;
    technicianId?: string;
    clientId?: string;
    scheduledFrom?: string;
    scheduledTo?: string;
    workOrderNumber?: string;
    page?: number;
    limit?: number;
    sortBy?: 'scheduledAt' | 'createdAt' | 'updatedAt' | 'workOrderNumber' | 'status';
    sortOrder?: 'asc' | 'desc';
}
