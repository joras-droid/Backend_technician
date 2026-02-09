import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import {
  ListUsersQueryDto,
  UpdateUserDto,
  ResetUserPasswordDto,
} from '../common/dto/user-management.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  findTechnicians() {
    return this.prisma.user.findMany({
      where: { role: 'TECHNICIAN' },
      orderBy: { lastName: 'asc' },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        username: true,
        phone: true,
        address: true,
        profileImageUrl: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findAll(query: ListUsersQueryDto) {
    const {
      role,
      page = 1,
      limit = 20,
      search,
    } = query;

    const where: any = {};

    if (role) {
      where.role = role;
    }

    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { username: { contains: search, mode: 'insensitive' } },
      ];
    }

    const skip = (page - 1) * limit;
    const take = Math.min(limit, 100);

    const total = await this.prisma.user.count({ where });

    const users = await this.prisma.user.findMany({
      where,
      skip,
      take,
      orderBy: { lastName: 'asc' },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        username: true,
        phone: true,
        address: true,
        profileImageUrl: true,
        role: true,
        whitelisted: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      data: users,
      pagination: {
        page,
        limit: take,
        total,
        totalPages: Math.ceil(total / take),
      },
    };
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        username: true,
        phone: true,
        address: true,
        profileImageUrl: true,
        role: true,
        whitelisted: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            workOrdersAssigned: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      ...user,
      workOrdersCount: user._count.workOrdersAssigned,
    };
  }

  async update(id: string, dto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if email already exists (if provided and changed)
    if (dto.email && dto.email !== user.email) {
      const existing = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
      if (existing) {
        throw new ConflictException('Email already exists');
      }
    }

    // Check if username already exists (if provided and changed)
    if (dto.username && dto.username !== user.username) {
      // Validate username format
      if (!/^[a-zA-Z0-9_]+$/.test(dto.username)) {
        throw new ConflictException('Username can only contain letters, numbers, and underscores. No spaces or special characters allowed.');
      }

      const existing = await this.prisma.user.findUnique({
        where: { username: dto.username },
      });
      if (existing) {
        throw new ConflictException('Username is already taken. Please choose a different username.');
      }
    }

    const updateData: any = {};
    if (dto.firstName !== undefined) updateData.firstName = dto.firstName;
    if (dto.lastName !== undefined) updateData.lastName = dto.lastName;
    if (dto.email !== undefined) updateData.email = dto.email;
    if (dto.username !== undefined) updateData.username = dto.username;
    if (dto.phone !== undefined) updateData.phone = dto.phone;
    if (dto.address !== undefined) updateData.address = dto.address;
    if (dto.role !== undefined) updateData.role = dto.role;

    return this.prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        username: true,
        phone: true,
        address: true,
        profileImageUrl: true,
        role: true,
        whitelisted: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findManagersAndTechnicians() {
    const users = await this.prisma.user.findMany({
      where: {
        role: {
          in: [UserRole.MANAGER, UserRole.TECHNICIAN],
        },
      },
      orderBy: [
        { role: 'asc' }, // MANAGER first, then TECHNICIAN
        { lastName: 'asc' },
      ],
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        username: true,
        phone: true,
        address: true,
        profileImageUrl: true,
        role: true,
        whitelisted: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            workOrdersAssigned: true,
            timeEntries: true,
          },
        },
      },
    });

    return {
      managers: users
        .filter((user) => user.role === UserRole.MANAGER)
        .map((user) => ({
          ...user,
          workOrdersCount: user._count.workOrdersAssigned,
          timeEntriesCount: user._count.timeEntries,
        })),
      technicians: users
        .filter((user) => user.role === UserRole.TECHNICIAN)
        .map((user) => ({
          ...user,
          workOrdersCount: user._count.workOrdersAssigned,
          timeEntriesCount: user._count.timeEntries,
        })),
      summary: {
        totalManagers: users.filter((user) => user.role === UserRole.MANAGER).length,
        totalTechnicians: users.filter((user) => user.role === UserRole.TECHNICIAN).length,
        total: users.length,
      },
    };
  }

  async resetPassword(id: string, dto: ResetUserPasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Only allow resetting passwords for MANAGER and TECHNICIAN roles
    if (user.role === UserRole.ADMIN) {
      throw new BadRequestException('Cannot reset password for admin users');
    }

    // Hash new password
    const saltRounds = parseInt(
      this.configService.get<string>('BCRYPT_ROUNDS', '10'),
      10,
    );
    const hashedPassword = await bcrypt.hash(dto.newPassword, saltRounds);

    // Update password
    await this.prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    });

    return {
      message: 'Password reset successfully',
      id,
    };
  }

  async delete(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            workOrdersAssigned: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user._count.workOrdersAssigned > 0) {
      throw new BadRequestException(
        'Cannot delete user with assigned work orders',
      );
    }

    await this.prisma.user.delete({
      where: { id },
    });

    return {
      message: 'User deleted successfully',
      id,
    };
  }
}
