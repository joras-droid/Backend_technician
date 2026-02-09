import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { Roles } from './auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import {
  ListUsersQueryDto,
  UpdateUserDto,
  ResetUserPasswordDto,
} from '../common/dto/user-management.dto';

@ApiTags('users')
@ApiBearerAuth('JWT-auth')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'List all users (Admin only)',
    description: 'Get list of all users with optional filters and pagination',
  })
  @ApiQuery({ name: 'role', required: false, enum: ['ADMIN', 'MANAGER', 'TECHNICIAN'] })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of users',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin role required' })
  findAll(@Query() query: ListUsersQueryDto) {
    return this.usersService.findAll(query);
  }

  @Get('technicians')
  @ApiOperation({
    summary: 'Get all technicians',
    description: 'Retrieve a list of all users with TECHNICIAN role',
  })
  @ApiResponse({
    status: 200,
    description: 'List of technicians',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          firstName: { type: 'string' },
          lastName: { type: 'string' },
          email: { type: 'string' },
          role: { type: 'string', enum: ['TECHNICIAN'] },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getTechnicians() {
    return this.usersService.findTechnicians();
  }

  @Get('managers-and-technicians')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all managers and technicians (Admin only)',
    description: 'Retrieve detailed information about all managers and technicians including work orders and time entries counts',
  })
  @ApiResponse({
    status: 200,
    description: 'Managers and technicians with detailed information',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 200 },
        data: {
          type: 'object',
          properties: {
            managers: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  firstName: { type: 'string' },
                  lastName: { type: 'string' },
                  email: { type: 'string' },
                  username: { type: 'string' },
                  phone: { type: 'string' },
                  address: { type: 'string' },
                  profileImageUrl: { type: 'string' },
                  role: { type: 'string', enum: ['MANAGER'] },
                  whitelisted: { type: 'boolean' },
                  workOrdersCount: { type: 'number' },
                  timeEntriesCount: { type: 'number' },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                },
              },
            },
            technicians: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  firstName: { type: 'string' },
                  lastName: { type: 'string' },
                  email: { type: 'string' },
                  username: { type: 'string' },
                  phone: { type: 'string' },
                  address: { type: 'string' },
                  profileImageUrl: { type: 'string' },
                  role: { type: 'string', enum: ['TECHNICIAN'] },
                  whitelisted: { type: 'boolean' },
                  workOrdersCount: { type: 'number' },
                  timeEntriesCount: { type: 'number' },
                  createdAt: { type: 'string', format: 'date-time' },
                  updatedAt: { type: 'string', format: 'date-time' },
                },
              },
            },
            summary: {
              type: 'object',
              properties: {
                totalManagers: { type: 'number' },
                totalTechnicians: { type: 'number' },
                total: { type: 'number' },
              },
            },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin role required' })
  getManagersAndTechnicians() {
    return this.usersService.findManagersAndTechnicians();
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get user details (Admin only)',
    description: 'Get detailed information about a specific user',
  })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    example: 'clx1234567890',
  })
  @ApiResponse({
    status: 200,
    description: 'User details',
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin role required' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update user (Admin only)',
    description: 'Update user information',
  })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    example: 'clx1234567890',
  })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin role required' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 409, description: 'Email or username already exists' })
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.usersService.update(id, dto);
  }

  @Post(':id/reset-password')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Reset user password (Admin only)',
    description: 'Reset password for a technician or manager. Cannot reset admin passwords.',
  })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    example: 'clx1234567890',
  })
  @ApiResponse({
    status: 200,
    description: 'Password reset successfully',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 200 },
        data: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Password reset successfully' },
            id: { type: 'string', example: 'clx1234567890' },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Cannot reset password for admin users' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin role required' })
  @ApiResponse({ status: 404, description: 'User not found' })
  resetPassword(@Param('id') id: string, @Body() dto: ResetUserPasswordDto) {
    return this.usersService.resetPassword(id, dto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete user (Admin only)',
    description: 'Delete a user. Cannot delete if user has assigned work orders.',
  })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    example: 'clx1234567890',
  })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
  })
  @ApiResponse({ status: 400, description: 'User has assigned work orders' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin role required' })
  @ApiResponse({ status: 404, description: 'User not found' })
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
