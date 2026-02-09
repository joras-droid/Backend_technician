import { Module } from '@nestjs/common';
import { TimeEntriesController, TimeEntriesAdminController } from './time-entries.controller';
import { TimeEntriesService } from './time-entries.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TimeEntriesController, TimeEntriesAdminController],
  providers: [TimeEntriesService],
  exports: [TimeEntriesService],
})
export class TimeEntriesModule {}
