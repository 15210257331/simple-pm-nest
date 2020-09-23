import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { UserModule } from '../user/user.module';
import { User } from '../user/user.entity';
import { Type } from './type.entity';
import { Tag } from './tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project,User,Type,Tag]),
    UserModule
  ],
  providers: [ProjectService],
  controllers: [ProjectController]
})
export class ProjectModule { }
