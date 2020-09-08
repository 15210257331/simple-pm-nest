/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get, Body, UseGuards, Post, UsePipes, Delete, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { LoginDTO, RegisterInfoDTO } from './user.dto';
import { ValidationPipe } from '../../pipe/validation.pipe';

@Controller('/user')
export class UserController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) { }

    // @UseGuards(AuthGuard('local'))
    @Post('/login')
    public async login(@Body() data: LoginDTO): Promise<any> {
        return this.userService.login(data);
    }

    // 获取用户信息
    @UseGuards(AuthGuard('jwt'))
    @Get('/info')
    public async getUserInfo(username: string): Promise<any> {
        return this.userService.getUserInfo(username);
    }

    // 注册
    @UseGuards(AuthGuard('jwt'))
    @UsePipes(new ValidationPipe())
    @Post('/register')
    public async register(@Body() data: RegisterInfoDTO): Promise<any> {
        return this.userService.register(data);
    }

    // 删除用户
    @UseGuards(AuthGuard('jwt'))
    @Delete('/delete/:id')
    public async delete(@Param('id') id: string): Promise<any> {
        return this.userService.deleteUser(id);
    }

    // 用户列表
    @UseGuards(AuthGuard('jwt'))
    @Get('/list')
    public async findAll(): Promise<any> {
        return this.userService.userList();
    }
}
