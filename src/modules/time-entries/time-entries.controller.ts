import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { TimeEntriesService } from './time-entries.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import {
  CheckInDto,
  CheckOutDto,
  EditTimeEntryDto,
} from '../../common/dto/time-entry.dto';
import { AuthenticatedRequest } from '../../common/interfaces/request.interface';

@ApiTags('time-entries')
@ApiBearerAuth('JWT-auth')
@Controller('work-orders/:workOrderId/time-entries')
@UseGuards(JwtAuthGuard)
export class TimeEntriesController {
  constructor(private readonly timeEntriesService: TimeEntriesService) {}

  @Post('check-in')
  @UseGuards(RolesGuard)
  @Roles(UserRole.TECHNICIAN)
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Check in (Technician)',
    description: 'Record check-in time and location for a work order',
  })
  @ApiParam({
    name: 'workOrderId',
    description: 'Work order ID',
    example: 'clx1234567890',
  })
  @ApiResponse({
    status: 201,
    description: 'Check-in recorded successfully',
  })
  @ApiResponse({ status: 400, description: 'Already checked in' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Work order not assigned to you' })
  @ApiResponse({ status: 404, description: 'Work order not found' })
  async checkIn(
    @Param('workOrderId') workOrderId: string,
    @Body() dto: CheckInDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.timeEntriesService.checkIn(
      workOrderId,
      req.user.id,
      dto,
    );
  }

  @Post('check-out')
  @UseGuards(RolesGuard)
  @Roles(UserRole.TECHNICIAN)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Check out (Technician)',
    description: 'Record check-out time and location for a work order',
  })
  @ApiParam({
    name: 'workOrderId',
    description: 'Work order ID',
    example: 'clx1234567890',
  })
  @ApiResponse({
    status: 200,
    description: 'Check-out recorded successfully',
  })
  @ApiResponse({ status: 400, description: 'Not checked in or already checked out' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Work order not assigned to you' })
  @ApiResponse({ status: 404, description: 'Work order or time entry not found' })
  async checkOut(
    @Param('workOrderId') workOrderId: string,
    @Body() dto: CheckOutDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.timeEntriesService.checkOut(
      workOrderId,
      req.user.id,
      dto,
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get time entries',
    description: 'Get all time entries for a work order',
  })
  @ApiParam({
    name: 'workOrderId',
    description: 'Work order ID',
    example: 'clx1234567890',
  })
  @ApiResponse({
    status: 200,
    description: 'List of time entries',
  })
  @ApiResponse({ status: 404, description: 'Work order not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(@Param('workOrderId') workOrderId: string) {
    return this.timeEntriesService.findAllForWorkOrder(workOrderId);
  }
}

@ApiTags('time-entries')
@ApiBearerAuth('JWT-auth')
@Controller('time-entries')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class TimeEntriesAdminController {
  constructor(private readonly timeEntriesService: TimeEntriesService) {}

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Edit time entry (Admin only)',
    description: 'Edit a time entry with audit trail. Technician will be notified.',
  })
  @ApiParam({
    name: 'id',
    description: 'Time entry ID',
    example: 'clx3333333333',
  })
  @ApiResponse({
    status: 200,
    description: 'Time entry updated successfully',
  })
  @ApiResponse({ status: 400, description: 'Validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin role required' })
  @ApiResponse({ status: 404, description: 'Time entry not found' })
  async edit(
    @Param('id') id: string,
    @Body() dto: EditTimeEntryDto,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.timeEntriesService.edit(id, dto, req.user.id);
  }
}
