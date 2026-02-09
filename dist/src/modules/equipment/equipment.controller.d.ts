import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto, UpdateEquipmentDto, SearchEquipmentQueryDto, AddCatalogEquipmentDto, AddCustomEquipmentDto, ApproveEquipmentDto, RejectEquipmentDto } from '../../common/dto/equipment.dto';
import { AuthenticatedRequest } from '../../common/interfaces/request.interface';
export declare class EquipmentController {
    private readonly equipmentService;
    constructor(equipmentService: EquipmentService);
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        vendor: string | null;
        price: number;
        minRange: number | null;
        maxRange: number | null;
        isActive: boolean;
    }[]>;
    search(query: SearchEquipmentQueryDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        vendor: string | null;
        price: number;
        minRange: number | null;
        maxRange: number | null;
        isActive: boolean;
    }[]>;
    getPendingApprovals(): Promise<({
        workOrder: {
            id: string;
            workOrderNumber: string;
            facilityName: string;
        };
        addedByTechnician: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        quantity: number;
        cost: number;
        vendor: string | null;
        equipmentId: string | null;
        workOrderId: string;
        receiptUrl: string | null;
        isCustom: boolean;
        approvalStatus: import(".prisma/client").$Enums.EquipmentApprovalStatus;
        approvedAt: Date | null;
        rejectionReason: string | null;
        addedByTechnicianId: string | null;
        approvedById: string | null;
    })[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        vendor: string | null;
        price: number;
        minRange: number | null;
        maxRange: number | null;
        isActive: boolean;
    }>;
    create(dto: CreateEquipmentDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        vendor: string | null;
        price: number;
        minRange: number | null;
        maxRange: number | null;
        isActive: boolean;
    }>;
    update(id: string, dto: UpdateEquipmentDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        vendor: string | null;
        price: number;
        minRange: number | null;
        maxRange: number | null;
        isActive: boolean;
    }>;
    delete(id: string): Promise<{
        message: string;
        id: string;
    }>;
    approve(id: string, dto: ApproveEquipmentDto, req: AuthenticatedRequest): Promise<{
        addedByTechnician: {
            id: string;
            firstName: string;
            lastName: string;
        } | null;
        approvedBy: {
            id: string;
            firstName: string;
            lastName: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        quantity: number;
        cost: number;
        vendor: string | null;
        equipmentId: string | null;
        workOrderId: string;
        receiptUrl: string | null;
        isCustom: boolean;
        approvalStatus: import(".prisma/client").$Enums.EquipmentApprovalStatus;
        approvedAt: Date | null;
        rejectionReason: string | null;
        addedByTechnicianId: string | null;
        approvedById: string | null;
    }>;
    reject(id: string, dto: RejectEquipmentDto, req: AuthenticatedRequest): Promise<{
        addedByTechnician: {
            id: string;
            firstName: string;
            lastName: string;
        } | null;
        approvedBy: {
            id: string;
            firstName: string;
            lastName: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        quantity: number;
        cost: number;
        vendor: string | null;
        equipmentId: string | null;
        workOrderId: string;
        receiptUrl: string | null;
        isCustom: boolean;
        approvalStatus: import(".prisma/client").$Enums.EquipmentApprovalStatus;
        approvedAt: Date | null;
        rejectionReason: string | null;
        addedByTechnicianId: string | null;
        approvedById: string | null;
    }>;
}
export declare class WorkOrderEquipmentController {
    private readonly equipmentService;
    constructor(equipmentService: EquipmentService);
    addCatalogEquipment(workOrderId: string, dto: AddCatalogEquipmentDto, req: AuthenticatedRequest): Promise<{
        workOrder: {
            workOrderNumber: string;
        };
        equipment: {
            id: string;
            name: string;
            price: number;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        quantity: number;
        cost: number;
        vendor: string | null;
        equipmentId: string | null;
        workOrderId: string;
        receiptUrl: string | null;
        isCustom: boolean;
        approvalStatus: import(".prisma/client").$Enums.EquipmentApprovalStatus;
        approvedAt: Date | null;
        rejectionReason: string | null;
        addedByTechnicianId: string | null;
        approvedById: string | null;
    }>;
    addCustomEquipment(workOrderId: string, dto: AddCustomEquipmentDto, req: AuthenticatedRequest): Promise<{
        workOrder: {
            workOrderNumber: string;
        };
        addedByTechnician: {
            id: string;
            firstName: string;
            lastName: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        quantity: number;
        cost: number;
        vendor: string | null;
        equipmentId: string | null;
        workOrderId: string;
        receiptUrl: string | null;
        isCustom: boolean;
        approvalStatus: import(".prisma/client").$Enums.EquipmentApprovalStatus;
        approvedAt: Date | null;
        rejectionReason: string | null;
        addedByTechnicianId: string | null;
        approvedById: string | null;
    }>;
}
