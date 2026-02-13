import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import {
  CreateEmployeeDto,
  WhitelistEmailDto,
  WhitelistEmailsDto,
  EmployeeResponseDto,
} from '../../common/dto/admin.dto';

@ApiTags('admin')
@ApiBearerAuth('JWT-auth')
@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('employees/whitelist')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'List all whitelisted employee emails',
    description: 'Get a list of all whitelisted email addresses and their status',
  })
  @ApiResponse({
    status: 200,
    description: 'List of whitelisted emails',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          email: { type: 'string', example: 'employee@example.com' },
          firstName: { type: 'string', example: 'John' },
          lastName: { type: 'string', example: 'Doe' },
          username: { type: 'string', example: 'johndoe_123456' },
          role: { type: 'string', enum: ['ADMIN', 'MANAGER', 'TECHNICIAN'] },
          accountCreated: { type: 'boolean', example: false },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
  async listWhitelistedEmails() {
    return this.adminService.listWhitelistedEmails();
  }

  @Post('employees/whitelist')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Whitelist an email address',
    description: 'Add an email address to the whitelist. User can then signup with this email.',
  })
  @ApiResponse({
    status: 201,
    description: 'Email whitelisted successfully',
    type: EmployeeResponseDto,
  })
  @ApiResponse({ status: 409, description: 'Email already whitelisted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
  async whitelistEmail(@Body() dto: WhitelistEmailDto) {
    return this.adminService.whitelistEmail(dto);
  }

  @Post('employees/whitelist/bulk')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Whitelist multiple email addresses',
    description: 'Add multiple email addresses to the whitelist at once',
  })
  @ApiResponse({
    status: 201,
    description: 'Emails processed',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          email: { type: 'string' },
          status: { type: 'string', enum: ['success', 'error'] },
          data: { type: 'object' },
          error: { type: 'string' },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
  async whitelistEmails(@Body() dto: WhitelistEmailsDto) {
    return this.adminService.whitelistEmails(dto);
  }

  @Post('employees')
  @HttpCode(HttpStatus.CREATED)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  @ApiOperation({
    summary: 'Create employee account',
    description: 'Create an employee account directly with email, name, and password. Admin and Manager can create employees.',
  })
  @ApiResponse({
    status: 201,
    description: 'Employee account created successfully',
    type: EmployeeResponseDto,
  })
  @ApiResponse({ status: 409, description: 'Employee account already exists' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
  async createEmployee(@Body() dto: CreateEmployeeDto) {
    return this.adminService.createEmployee(dto);
  }

  @Delete('employees/whitelist/:email')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Remove email from whitelist',
    description: 'Remove an email address from the whitelist. If account exists, it will be deactivated.',
  })
  @ApiParam({
    name: 'email',
    description: 'Email address to remove from whitelist',
    example: 'employee@example.com',
  })
  @ApiResponse({
    status: 200,
    description: 'Email removed from whitelist',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        email: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Email not found' })
  @ApiResponse({ status: 400, description: 'Email is not whitelisted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin access required' })
  async removeFromWhitelist(@Param('email') email: string) {
    return this.adminService.removeFromWhitelist(email);
  }
}
