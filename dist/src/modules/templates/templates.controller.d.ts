import { TemplatesService } from './templates.service';
import { CreateWorkOrderTemplateDto, UpdateWorkOrderTemplateDto } from '../../common/dto/template.dto';
export declare class TemplatesController {
    private readonly templatesService;
    constructor(templatesService: TemplatesService);
    findAll(): Promise<({
        _count: {
            workOrders: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        notes: string | null;
        tasks: string | null;
    })[]>;
    findOne(id: string): Promise<{
        _count: {
            workOrders: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        notes: string | null;
        tasks: string | null;
    }>;
    create(dto: CreateWorkOrderTemplateDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        notes: string | null;
        tasks: string | null;
    }>;
    update(id: string, dto: UpdateWorkOrderTemplateDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        notes: string | null;
        tasks: string | null;
    }>;
    delete(id: string): Promise<{
        message: string;
        id: string;
    }>;
}
