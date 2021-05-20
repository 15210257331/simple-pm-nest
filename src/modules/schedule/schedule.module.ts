import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../entity/user.entity';
import { Schedule } from '../../entity/schedule.entity';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Schedule,User]),
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService],
  exports: [
    ScheduleService
  ]
})
export class ScheduleModule {}
