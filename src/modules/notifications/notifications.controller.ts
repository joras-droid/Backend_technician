import {
  Controller,
  Get,
  Patch,
  Param,
  Query,
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
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from '../../common/interfaces/request.interface';

@ApiTags('notifications')
@ApiBearerAuth('JWT-auth')
@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get user notifications',
    description: 'Get notifications for the authenticated user',
  })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
  @ApiQuery({ name: 'unreadOnly', required: false, type: Boolean, example: false })
  @ApiResponse({
    status: 200,
    description: 'Paginated list of notifications',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('unreadOnly') unreadOnly: string,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.notificationsService.findAll(
      req.user.id,
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 20,
      unreadOnly === 'true',
    );
  }

  @Get('unread-count')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get unread notification count',
    description: 'Get count of unread notifications for the authenticated user',
  })
  @ApiResponse({
    status: 200,
    description: 'Unread count',
    schema: {
      type: 'object',
      properties: {
        statusCode: { type: 'number', example: 200 },
        data: {
          type: 'object',
          properties: {
            unreadCount: { type: 'number', example: 5 },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getUnreadCount(@Request() req: AuthenticatedRequest) {
    return this.notificationsService.getUnreadCount(req.user.id);
  }

  @Patch(':id/read')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Mark notification as read',
    description: 'Mark a notification as read',
  })
  @ApiParam({
    name: 'id',
    description: 'Notification ID',
    example: 'clx7777777777',
  })
  @ApiResponse({
    status: 200,
    description: 'Notification marked as read',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Notification not found' })
  async markAsRead(
    @Param('id') id: string,
    @Request() req: AuthenticatedRequest,
  ) {
    return this.notificationsService.markAsRead(id, req.user.id);
  }
}
