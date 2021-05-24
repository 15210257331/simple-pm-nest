import { Tag } from './entity/tag.entity';
import { Task } from './entity/task.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { FileModule } from './modules/file/file.module';
import { ProjectModule } from './modules/project/project.module';
import { Project } from './entity/project.entity';
import { Type } from './entity/type.entity';
import { EventsGateway } from './modules/message/events.gateway';
import { RoleModule } from './modules/role/role.module';
import { Role } from './entity/role.entity';
import { Schedule } from './entity/schedule.entity';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { MessageModule } from './modules/message/message.module';
import { Message } from './entity/message.entity';
import { Comment } from './entity/comment.entity';

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
