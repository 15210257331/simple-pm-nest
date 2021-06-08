import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entity/user.entity';
import { AuthModule } from '../auth/auth.module';
import { Role } from '../role/entity/role.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([User,Role]),
        AuthModule // AuthModule 导出了 JwtModule JwtService依赖于JwtModule 否则userModule 无法使用JwtService
    ],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService]
})
export class UserModule { }
