import { Tag } from './modules/project/entity/tag.entity';
import { Task } from './modules/project/entity/task.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/entity/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { FileModule } from './modules/file/file.module';
import { ProjectModule } from './modules/project/project.module';
import { Project } from './modules/project/entity/project.entity';
import { Type } from './modules/project/entity/type.entity';
import { EventsGateway } from './modules/message/events.gateway';
import { RoleModule } from './modules/role/role.module';
import { Role } from './modules/role/entity/role.entity';
import { Schedule } from './modules/schedule/entity/schedule.entity';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { MessageModule } from './modules/message/message.module';
import { Message } from './modules/message/entity/message.entity';
import { Comment } from './modules/project/entity/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'simple_pm',
      entities: [User,Project,Task,Type, Tag,Role,Schedule,Comment,Message],
      charset: "utf8mb4", // 设置chatset编码为utf8mb4
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    FileModule,
    ProjectModule,
    RoleModule,
    ScheduleModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule { }
