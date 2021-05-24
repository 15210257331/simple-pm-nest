import { Body, Controller, Get, Param, Post, UseGuards, UsePipes } from '@nestjs/common';
import { ValidationPipe } from '../../pipe/validation.pipe';
import { Result } from '../../interface/result.interface';
import { AuthGuard } from '@nestjs/passport';
import { MessageService } from './message.service';

@Controller('/message')
export class MessageController {
    constructor(
        private readonly messageService: MessageService,
    ) { }

    @Post('/list')
    @UsePipes(new ValidationPipe())
    @UseGuards(AuthGuard('jwt'))
    public async list(@Body() body: any,): Promise<Result> {
        return this.messageService.list(body);
    }

    @Post('/add')
    @UsePipes(new ValidationPipe())
    @UseGuards(AuthGuard('jwt'))
    public async add(@Body() data: any,): Promise<Result> {
        return this.messageService.add(data);
    }
}
