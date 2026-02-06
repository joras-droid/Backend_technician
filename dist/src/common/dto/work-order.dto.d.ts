import { WorkOrderStatus } from '@prisma/client';
export declare class CreateWorkOrderEquipmentDto {
    name: string;
    quantity: number;
    cost?: number;
    vendor?: string;
}
export declare class CreateWorkOrderDto {
    workOrderNumber: string;
    scheduledAt: string;
    estimatedHours?: number;
    payRate?: number;
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
export declare class UpdateWorkOrderDto {
    scheduledAt?: string;
    estimatedHours?: number;
    payRate?: number;
    facilityName?: string;
    facilityAddress?: string;
    pointOfContact?: string;
    tasks?: string;
    notes?: string;
    status?: WorkOrderStatus;
    clientId?: string;
    technicianId?: string;
    invoiceNumber?: string;
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
