import { Tag } from './modules/project/entity/tag.entity';
import { Task } from './modules/task/entity/task.entity';
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
import { TaskModule } from './modules/task/task.module';
import { Type } from './modules/project/entity/type.entity';
import { EventsGateway } from './modules/message/events.gateway';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'simple_pm',
      entities: [User,Project,Task,Type, Tag],
      charset: "utf8mb4", // 设置chatset编码为utf8mb4
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    FileModule,
    ProjectModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule { }
