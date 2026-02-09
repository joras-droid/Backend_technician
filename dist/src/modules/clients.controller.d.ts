import { ClientsService } from './clients.service';
import { CreateClientDto, UpdateClientDto } from '../common/dto/client.dto';
export declare class ClientsController {
    private readonly clientsService;
    constructor(clientsService: ClientsService);
    getAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        address: string | null;
        name: string;
        notes: string | null;
    }[]>;
    findOne(id: string): Promise<{
        workOrdersCount: number;
        _count: {
            workOrders: number;
        };
        id: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        address: string | null;
        name: string;
        notes: string | null;
    }>;
    create(dto: CreateClientDto): Promise<{
        id: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        address: string | null;
        name: string;
        notes: string | null;
    }>;
    update(id: string, dto: UpdateClientDto): Promise<{
        id: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        phone: string | null;
        address: string | null;
        name: string;
        notes: string | null;
    }>;
    delete(id: string): Promise<{
        message: string;
        id: string;
    }>;
}
