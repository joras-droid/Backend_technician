import { PrismaService } from '../../prisma/prisma.service';
import { CreateEquipmentDto, UpdateEquipmentDto, SearchEquipmentQueryDto, AddCatalogEquipmentDto, AddCustomEquipmentDto, ApproveEquipmentDto, RejectEquipmentDto } from '../../common/dto/equipment.dto';
export declare class EquipmentService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateEquipmentDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        vendor: string | null;
        description: string | null;
        isActive: boolean;
        price: number;
        minRange: number | null;
        maxRange: number | null;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        vendor: string | null;
        description: string | null;
        isActive: boolean;
        price: number;
        minRange: number | null;
        maxRange: number | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        vendor: string | null;
        description: string | null;
        isActive: boolean;
        price: number;
        minRange: number | null;
        maxRange: number | null;
    }>;
    update(id: string, dto: UpdateEquipmentDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        vendor: string | null;
        description: string | null;
        isActive: boolean;
        price: number;
        minRange: number | null;
        maxRange: number | null;
    }>;
    delete(id: string): Promise<{
        message: string;
        id: string;
    }>;
    search(query: SearchEquipmentQueryDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        vendor: string | null;
        description: string | null;
        isActive: boolean;
        price: number;
        minRange: number | null;
        maxRange: number | null;
    }[]>;
    addCatalogEquipment(workOrderId: string, dto: AddCatalogEquipmentDto, technicianId: string): Promise<{
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
        workOrderId: string;
        quantity: number;
        cost: number;
        vendor: string | null;
        equipmentId: string | null;
        receiptUrl: string | null;
        isCustom: boolean;
        approvalStatus: import(".prisma/client").$Enums.EquipmentApprovalStatus;
        approvedAt: Date | null;
        rejectionReason: string | null;
        addedByTechnicianId: string | null;
        approvedById: string | null;
    }>;
    addCustomEquipment(workOrderId: string, dto: AddCustomEquipmentDto, technicianId: string): Promise<{
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
        workOrderId: string;
        quantity: number;
        cost: number;
        vendor: string | null;
        equipmentId: string | null;
        receiptUrl: string | null;
        isCustom: boolean;
        approvalStatus: import(".prisma/client").$Enums.EquipmentApprovalStatus;
        approvedAt: Date | null;
        rejectionReason: string | null;
        addedByTechnicianId: string | null;
        approvedById: string | null;
    }>;
    approveEquipment(equipmentId: string, dto: ApproveEquipmentDto, approverId: string): Promise<{
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
        workOrderId: string;
        quantity: number;
        cost: number;
        vendor: string | null;
        equipmentId: string | null;
        receiptUrl: string | null;
        isCustom: boolean;
        approvalStatus: import(".prisma/client").$Enums.EquipmentApprovalStatus;
        approvedAt: Date | null;
        rejectionReason: string | null;
        addedByTechnicianId: string | null;
        approvedById: string | null;
    }>;
    rejectEquipment(equipmentId: string, dto: RejectEquipmentDto, approverId: string): Promise<{
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
        workOrderId: string;
        quantity: number;
        cost: number;
        vendor: string | null;
        equipmentId: string | null;
        receiptUrl: string | null;
        isCustom: boolean;
        approvalStatus: import(".prisma/client").$Enums.EquipmentApprovalStatus;
        approvedAt: Date | null;
        rejectionReason: string | null;
        addedByTechnicianId: string | null;
        approvedById: string | null;
    }>;
    getPendingApprovals(): Promise<({
        workOrder: {
            id: string;
            workOrderNumber: string;
            facilityName: string;
        };
        addedByTechnician: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        workOrderId: string;
        quantity: number;
        cost: number;
        vendor: string | null;
        equipmentId: string | null;
        receiptUrl: string | null;
        isCustom: boolean;
        approvalStatus: import(".prisma/client").$Enums.EquipmentApprovalStatus;
        approvedAt: Date | null;
        rejectionReason: string | null;
        addedByTechnicianId: string | null;
        approvedById: string | null;
    })[]>;
}
