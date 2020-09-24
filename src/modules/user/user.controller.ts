/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get, Body, UseGuards, Post, UsePipes, Delete, Param, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { ValidationPipe } from '../../pipe/validation.pipe';
import { Result } from '../../interface/result.interface';
import { PostBody } from '../../interface/post-body.interface';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';
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
    @Post('/register')
    @UsePipes(new ValidationPipe())
    public async register(@Body() data: RegisterDTO): Promise<Result> {
        return this.userService.register(data);
    }

    // 获取用户信息
    @UseGuards(AuthGuard('jwt'))
    @Get('/info')
    public async getUserInfo(@Request() request: any): Promise<Result> {
        return this.userService.getUserInfo(request);
    }

    // 删除用户
    @UseGuards(AuthGuard('jwt'))
    @Delete('/delete/:id')
    public async delete(@Param('id') id: string): Promise<Result> {
        return this.userService.deleteUser(id);
    }

    // 用户列表
    @UseGuards(AuthGuard('jwt'))
    @Post('/list')
    public async findAll(@Body() body: PostBody): Promise<Result> {
        return this.userService.userList(body);
    }
}
