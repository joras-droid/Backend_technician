import { TimeEntriesService } from './time-entries.service';
import { CheckInDto, CheckOutDto, EditTimeEntryDto } from '../../common/dto/time-entry.dto';
import { AuthenticatedRequest } from '../../common/interfaces/request.interface';
export declare class TimeEntriesController {
    private readonly timeEntriesService;
    constructor(timeEntriesService: TimeEntriesService);
    checkIn(workOrderId: string, dto: CheckInDto, req: AuthenticatedRequest): Promise<{
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
    checkOut(workOrderId: string, dto: CheckOutDto, req: AuthenticatedRequest): Promise<{
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
    findAll(workOrderId: string): Promise<{
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
}
export declare class TimeEntriesAdminController {
    private readonly timeEntriesService;
    constructor(timeEntriesService: TimeEntriesService);
    edit(id: string, dto: EditTimeEntryDto, req: AuthenticatedRequest): Promise<{
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
