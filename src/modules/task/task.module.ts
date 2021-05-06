import { ProjectModule } from './../project/project.module';
import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { Task } from './entity/task.entity';
import { TaskService } from './task.service';
import { Project } from '../project/entity/project.entity';
import { User } from '../user/entity/user.entity';
import { Type } from '../project/entity/type.entity';
import { Tag } from '../project/entity/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, Project, User, Type, Tag]),
    UserModule,
    ProjectModule
  ],
  providers: [TaskService],
  controllers: [TaskController]
})
export class TaskModule { }
