import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Public } from './modules/auth/decorators/public.decorator';

@ApiTags('health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Health check', description: 'Check if the API is running' })
  @ApiResponse({ status: 200, description: 'API is running', schema: { type: 'string', example: 'Hello World!' } })
  getHello(): string {
    return this.appService.getHello();
  }
}
