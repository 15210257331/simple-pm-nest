/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get, Body, UseGuards, Post, UsePipes, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { LoginDTO, RegisterInfoDTO } from './dto/user.dto';
import { ValidationPipe } from '../../pipe/validation.pipe';
import { Result } from '../../interface/result.interface';
@Controller('/user')
export class UserController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) { }

    // 登录
    // @UseGuards(AuthGuard('local'))
    @UsePipes(new ValidationPipe())
    @Post('/login')
    public async login(@Body() loginDTO: LoginDTO): Promise<Result> {
        return this.userService.login(loginDTO);
    }

    // 注册
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    @Post('/register')
    public async register(@Body() data: RegisterInfoDTO): Promise<Result> {
        return this.userService.register(data);
    }

    // 获取用户信息
    @UseGuards(AuthGuard('jwt'))
    @Get('/info')
    public async getUserInfo(username: string): Promise<Result> {
        return this.userService.getUserInfo(username);
    }

    // 删除用户
    @UseGuards(AuthGuard('jwt'))
    @Delete('/delete/:id')
    public async delete(@Param('id') id: string): Promise<Result> {
        return this.userService.deleteUser(id);
    }

    // 用户列表
    @UseGuards(AuthGuard('jwt'))
    @Get('/list')
    public async findAll(): Promise<Result> {
        return this.userService.userList();
    }
}
