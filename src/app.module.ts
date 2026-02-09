import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { ClientsModule } from './modules/clients/clients.module';
import { WorkOrdersModule } from './modules/work-orders/work-orders.module';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';
import { TemplatesModule } from './modules/templates/templates.module';
import { TimeEntriesModule } from './modules/time-entries/time-entries.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { ReportsModule } from './modules/reports/reports.module';
import { EquipmentModule } from './modules/equipment/equipment.module';
import { S3Module } from './common/services/s3.module';
import { LoggerModule } from './common/services/logger.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    S3Module,
    LoggerModule,
    UsersModule,
    ClientsModule,
    WorkOrdersModule,
    AuthModule,
    AdminModule,
    TemplatesModule,
    TimeEntriesModule,
    NotificationsModule,
    ReportsModule,
    EquipmentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
