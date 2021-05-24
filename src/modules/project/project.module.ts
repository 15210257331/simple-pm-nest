import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../../entity/project.entity';
import { UserModule } from '../user/user.module';
import { User } from '../../entity/user.entity';
import { Type } from '../../entity/type.entity';
import { Tag } from '../../entity/tag.entity';
import { Comment } from '../../entity/comment.entity'
import { Task } from '../../entity/task.entity';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project,Task,User,Type,Tag,Comment]),
    UserModule
  ],
  providers: [ProjectService,TaskService],
  controllers: [ProjectController,TaskController]
})
export class ProjectModule { }
