import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../../entity/project.entity';
import { UserModule } from '../user/user.module';
import { User } from '../../entity/user.entity';
import { Type } from '../../entity/type.entity';
import { Tag } from '../../entity/tag.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project,User,Type,Tag]),
    UserModule
  ],
  providers: [ProjectService],
  controllers: [ProjectController]
})
export class ProjectModule { }
