import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientDto, UpdateClientDto } from '../common/dto/client.dto';

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.client.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const client = await this.prisma.client.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            workOrders: true,
          },
        },
      },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    return {
      ...client,
      workOrdersCount: client._count.workOrders,
    };
  }

  async create(dto: CreateClientDto) {
    // Check if email already exists (if provided)
    if (dto.email) {
      const existing = await this.prisma.client.findFirst({
        where: { email: dto.email },
      });
      if (existing) {
        throw new ConflictException('Client with this email already exists');
      }
    }

    return this.prisma.client.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        address: dto.address,
        notes: dto.notes,
      },
    });
  }

  async update(id: string, dto: UpdateClientDto) {
    const client = await this.prisma.client.findUnique({
      where: { id },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    // Check if email already exists (if provided and changed)
    if (dto.email && dto.email !== client.email) {
      const existing = await this.prisma.client.findFirst({
        where: {
          email: dto.email,
          id: { not: id },
        },
      });
      if (existing) {
        throw new ConflictException('Client with this email already exists');
      }
    }

    return this.prisma.client.update({
      where: { id },
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        address: dto.address,
        notes: dto.notes,
      },
    });
  }

  async delete(id: string) {
    const client = await this.prisma.client.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            workOrders: true,
          },
        },
      },
    });

    if (!client) {
      throw new NotFoundException('Client not found');
    }

    if (client._count.workOrders > 0) {
      throw new BadRequestException(
        'Cannot delete client with associated work orders',
      );
    }

    await this.prisma.client.delete({
      where: { id },
    });

    return {
      message: 'Client deleted successfully',
      id,
    };
  }
}
