import { Module } from '@nestjs/common';
import {
  EquipmentController,
  WorkOrderEquipmentController,
} from './equipment.controller';
import { EquipmentService } from './equipment.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [
    EquipmentController,
    WorkOrderEquipmentController,
  ],
  providers: [EquipmentService],
  exports: [EquipmentService],
})
export class EquipmentModule {}
