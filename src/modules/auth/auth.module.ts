import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'
import { LocalStrategy } from './local.strategy';
import { AuthService } from './auth.service';
import { jwtConfig } from '../../common/config';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConfig.secret, // 设置secret
      signOptions: { expiresIn: '36000s' }, // 设置token的属性，时间为3600*10就是十小时
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [],
  providers: [AuthService, LocalStrategy, JwtStrategy], // 把AuthService，LocalStrategy注册成提供者
  exports: [AuthService, LocalStrategy, JwtStrategy], // 把这个服务抛出，给其他模块使用
})
export class AuthModule { }
