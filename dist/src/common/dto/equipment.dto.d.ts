export declare class CreateEquipmentDto {
    name: string;
    description?: string;
    price: number;
    minRange?: number;
    maxRange?: number;
    vendor?: string;
}
export declare class UpdateEquipmentDto {
    name?: string;
    description?: string;
    price?: number;
    minRange?: number;
    maxRange?: number;
    vendor?: string;
    isActive?: boolean;
}
export declare class SearchEquipmentQueryDto {
    search: string;
    limit?: number;
}
export declare class AddCatalogEquipmentDto {
    equipmentId: string;
    quantity: number;
}
export declare class AddCustomEquipmentDto {
    name: string;
    quantity: number;
    cost: number;
    vendor?: string;
    receiptUrl?: string;
}
export declare class ApproveEquipmentDto {
    note?: string;
}
export declare class RejectEquipmentDto {
    reason: string;
}
