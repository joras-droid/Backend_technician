import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateWorkOrderTemplateDto,
  UpdateWorkOrderTemplateDto,
} from '../../common/dto/template.dto';

@Injectable()
export class TemplatesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.workOrderTemplate.findMany({
      orderBy: { name: 'asc' },
      include: {
        _count: {
          select: {
            workOrders: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const template = await this.prisma.workOrderTemplate.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            workOrders: true,
          },
        },
      },
    });

    if (!template) {
      throw new NotFoundException('Template not found');
    }

    return template;
  }

  async create(dto: CreateWorkOrderTemplateDto) {
    return this.prisma.workOrderTemplate.create({
      data: {
        name: dto.name,
        tasks: dto.tasks,
        notes: dto.notes,
      },
    });
  }

  async update(id: string, dto: UpdateWorkOrderTemplateDto) {
    const template = await this.prisma.workOrderTemplate.findUnique({
      where: { id },
    });

    if (!template) {
      throw new NotFoundException('Template not found');
    }

    return this.prisma.workOrderTemplate.update({
      where: { id },
      data: {
        name: dto.name,
        tasks: dto.tasks,
        notes: dto.notes,
      },
    });
  }

  async delete(id: string) {
    const template = await this.prisma.workOrderTemplate.findUnique({
      where: { id },
    });

    if (!template) {
      throw new NotFoundException('Template not found');
    }

    await this.prisma.workOrderTemplate.delete({
      where: { id },
    });

    return {
      message: 'Template deleted successfully',
      id,
    };
  }
}
