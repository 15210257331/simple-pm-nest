/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get, Request, UseGuards, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';

@Controller('/users')
export class UsersController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService
    ) { }

    // 通过本地策略 进行用户名和密码的验证
    @UseGuards(AuthGuard('local'))
    @Post('/login')
    public async login(@Request() req: any): Promise<any> {
        return this.authService.login(req);
    }
}
