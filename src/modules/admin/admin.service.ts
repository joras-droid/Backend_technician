import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import {
  CreateEmployeeDto,
  WhitelistEmailDto,
  WhitelistEmailsDto,
} from '../../common/dto/admin.dto';
import { UserRole } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  /**
   * List all whitelisted employee emails
   */
  async listWhitelistedEmails() {
    const users = await this.prisma.user.findMany({
      where: {
        whitelisted: true,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        email: 'asc',
      },
    });

    // Determine account status: if updatedAt is significantly after createdAt, account was activated
    return users.map((user) => {
      const timeDiff = user.updatedAt.getTime() - user.createdAt.getTime();
      // If updated more than 5 seconds after creation, account was likely activated
      const accountCreated = timeDiff > 5000;
      
      return {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        role: user.role,
        accountCreated,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    });
  }

  /**
   * Whitelist a single email address
   */
  async whitelistEmail(dto: WhitelistEmailDto) {
    const { email, firstName, lastName } = dto;

    // Check if email already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      if (existingUser.whitelisted) {
        throw new ConflictException('Email is already whitelisted');
      }
      // Update existing user to whitelisted
      return this.prisma.user.update({
        where: { email },
        data: {
          whitelisted: true,
          firstName: firstName || existingUser.firstName,
          lastName: lastName || existingUser.lastName,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          username: true,
          role: true,
          whitelisted: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    }

    // Generate temporary unique username from email (placeholder - user will choose their own during signup)
    // This username will be replaced when the user completes signup with their chosen username
    const baseUsername = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');
    let username = baseUsername + '_' + Date.now().toString().slice(-6);
    
    // Ensure username is unique
    let counter = 0;
    while (await this.prisma.user.findUnique({ where: { username } })) {
      username = baseUsername + '_' + Date.now().toString().slice(-6) + '_' + counter;
      counter++;
    }

    // Create whitelisted user record
    // Use a temporary password that will be replaced during signup
    // The username above is also temporary - user will provide their own during signup
    const tempPassword = 'TEMP_PASSWORD_' + Date.now().toString();
    const saltRounds = parseInt(
      this.configService.get<string>('BCRYPT_ROUNDS', '10'),
      10,
    );
    const hashedTempPassword = await bcrypt.hash(tempPassword, saltRounds);

    return this.prisma.user.create({
      data: {
        email,
        firstName: firstName || '',
        lastName: lastName || '',
        username,
        password: hashedTempPassword, // Temporary password - user will set during signup
        role: UserRole.TECHNICIAN,
        whitelisted: true,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        username: true,
        role: true,
        whitelisted: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  /**
   * Whitelist multiple email addresses
   */
  async whitelistEmails(dto: WhitelistEmailsDto) {
    const { emails } = dto;
    const results = [];

    for (const email of emails) {
      try {
        const result = await this.whitelistEmail({ email });
        results.push({ email, status: 'success', data: result });
      } catch (error) {
        results.push({
          email,
          status: 'error',
          error: error.message,
        });
      }
    }

    return results;
  }

  /**
   * Create employee account directly (with password).
   * Accounts created via this endpoint are automatically whitelisted (whitelisted: true).
   * Managers can only create TECHNICIAN roles; Admins can create any role.
   */
  async createEmployee(dto: CreateEmployeeDto, callerRole?: string) {
    const { password, email, payRate, defaultPayRate, ...rest } = dto;
    const requestedRole = rest.role || UserRole.TECHNICIAN;

    // Managers cannot create Admin or Manager - only Technicians
    if (callerRole === UserRole.MANAGER) {
      if (requestedRole === UserRole.ADMIN || requestedRole === UserRole.MANAGER) {
        throw new ForbiddenException(
          'Managers can only create Technician accounts. Cannot create Admin or Manager.',
        );
      }
    }
    const effectivePayRate = defaultPayRate ?? payRate;

    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      if (existingUser.password) {
        throw new ConflictException('Employee account already exists');
      }
      // Update existing whitelisted user with password
      const saltRounds = parseInt(
        this.configService.get<string>('BCRYPT_ROUNDS', '10'),
        10,
      );
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      return this.prisma.user.update({
        where: { email },
        data: {
          ...rest,
          password: hashedPassword,
          whitelisted: true,
          defaultPayRate: effectivePayRate,
        },
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
          defaultPayRate: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    }

    // Generate unique username from email
    const baseUsername = email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');
    let username = baseUsername + '_' + Date.now().toString().slice(-6);
    
    // Ensure username is unique
    let counter = 0;
    while (await this.prisma.user.findUnique({ where: { username } })) {
      username = baseUsername + '_' + Date.now().toString().slice(-6) + '_' + counter;
      counter++;
    }

    // Hash password
    const saltRounds = parseInt(
      this.configService.get<string>('BCRYPT_ROUNDS', '10'),
      10,
    );
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create employee account
    return this.prisma.user.create({
      data: {
        ...rest,
        email,
        username,
        password: hashedPassword,
        role: rest.role || UserRole.TECHNICIAN,
        whitelisted: true,
        defaultPayRate: effectivePayRate,
      },
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
        defaultPayRate: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  /**
   * Remove email from whitelist
   */
  async removeFromWhitelist(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('Email not found');
    }

    if (!user.whitelisted) {
      throw new BadRequestException('Email is not whitelisted');
    }

    // Check if account was activated (updatedAt significantly after createdAt)
    const timeDiff = user.updatedAt.getTime() - user.createdAt.getTime();
    const accountActivated = timeDiff > 5000;
    
    if (!accountActivated) {
      // Delete the whitelist record if account was never activated
      await this.prisma.user.delete({
        where: { email },
      });
      return { message: 'Email removed from whitelist', email };
    } else {
      // Update whitelisted status but keep account (deactivate)
      await this.prisma.user.update({
        where: { email },
        data: { whitelisted: false },
      });
      return { message: 'Email removed from whitelist (account deactivated)', email };
    }
  }
}
