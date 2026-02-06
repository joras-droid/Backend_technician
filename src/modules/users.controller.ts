import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@ApiTags('users')
@ApiBearerAuth('JWT-auth')
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
}
