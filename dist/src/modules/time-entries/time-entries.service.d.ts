import { PrismaService } from '../../prisma/prisma.service';
import { CheckInDto, CheckOutDto, EditTimeEntryDto } from '../../common/dto/time-entry.dto';
export declare class TimeEntriesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    checkIn(workOrderId: string, technicianId: string, dto: CheckInDto): Promise<{
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
    }>;
    checkOut(workOrderId: string, callerId: string, callerRole: string, dto: CheckOutDto): Promise<{
        totalHours: number;
        technician: {
            id: string;
            firstName: string;
            lastName: string;
        };
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
    }>;
    findAllForWorkOrder(workOrderId: string): Promise<{
        totalHours: number | null;
        technician: {
            id: string;
            firstName: string;
            lastName: string;
        };
        edits: ({
            editedBy: {
                id: string;
                firstName: string;
                lastName: string;
            };
        } & {
            id: string;
            createdAt: Date;
            timeEntryId: string;
            field: string;
            originalValue: string | null;
            updatedValue: string | null;
            editedById: string;
        })[];
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
    }[]>;
    edit(id: string, dto: EditTimeEntryDto, adminId: string): Promise<{
        totalHours: number | null;
        editReason: string;
        technician: {
            id: string;
            firstName: string;
            lastName: string;
        };
        edits: ({
            editedBy: {
                id: string;
                firstName: string;
                lastName: string;
            };
        } & {
            id: string;
            createdAt: Date;
            timeEntryId: string;
            field: string;
            originalValue: string | null;
            updatedValue: string | null;
            editedById: string;
        })[];
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
    }>;
}
