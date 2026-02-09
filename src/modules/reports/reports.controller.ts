import {
  Controller,
  Get,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { Response } from 'express';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('reports')
@ApiBearerAuth('JWT-auth')
@Controller('reports')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.MANAGER)
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('work-orders')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Work order reports (Admin/Manager)',
    description: 'Generate work order reports with filters',
  })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  @ApiQuery({ name: 'status', required: false, enum: ['ACTIVE', 'COMPLETED', 'PAID'] })
  @ApiQuery({ name: 'technicianId', required: false, type: String })
  @ApiQuery({ name: 'clientId', required: false, type: String })
  @ApiQuery({ name: 'groupBy', required: false, type: String })
  @ApiResponse({
    status: 200,
    description: 'Work order report',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin or Manager role required' })
  async getWorkOrderReport(@Query() query: any) {
    return this.reportsService.getWorkOrderReport(query);
  }

  @Get('time-summary')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Technician time summary (Admin/Manager)',
    description: 'Get time tracking summary for technicians',
  })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  @ApiQuery({ name: 'technicianId', required: false, type: String })
  @ApiResponse({
    status: 200,
    description: 'Time summary report',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin or Manager role required' })
  async getTimeSummary(@Query() query: any) {
    return this.reportsService.getTimeSummary(query);
  }

  @Get('export')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Export data (Admin/Manager)',
    description: 'Export data as CSV file',
  })
  @ApiQuery({
    name: 'type',
    required: true,
    enum: ['work-orders', 'time-entries', 'clients', 'users'],
  })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  @ApiQuery({ name: 'format', required: false, enum: ['csv', 'xlsx'], default: 'csv' })
  @ApiResponse({
    status: 200,
    description: 'CSV file download',
    content: {
      'text/csv': {
        schema: {
          type: 'string',
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin or Manager role required' })
  async exportData(@Query() query: any, @Res() res: Response) {
    const result = await this.reportsService.exportData(query.type, query);
    res.setHeader('Content-Type', result.contentType);
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${result.filename}"`,
    );
    res.send(result.data);
  }
}
