/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get, Request, UseGuards, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';
import { TestGuard } from '../../guard/test.guard';

@Controller('/user')
export class UserController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) { }

    // 通过本地策略 进行用户名和密码的验证 不加则表示使用了默认的策略
    @UseGuards(AuthGuard('local'))
    @Post('/login')
    public async login(@Request() req: any): Promise<any> {
        console.log(req);
        // return this.authService.login(req);
    }

    @Get()
    public async getUserInfo(username: string): Promise<any> {
        return this.userService.getUserInfo(username);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/findAll')
    public async findAll(): Promise<any> {
        return this.userService.findAll();
    }
}
