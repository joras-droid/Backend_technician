import { Module } from '@nestjs/common';
import { WorkOrdersController } from '../work-orders.controller';
import { WorkOrdersService } from '../work-orders.service';
import { S3Module } from '../../common/services/s3.module';

@Module({
  imports: [S3Module],
  controllers: [WorkOrdersController],
  providers: [WorkOrdersService],
})
export class WorkOrdersModule {}
