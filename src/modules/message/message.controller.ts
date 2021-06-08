import { Body, Controller, Get, Request, Param, Post, Query, UseGuards, UsePipes } from '@nestjs/common';
import { ValidationPipe } from '../../pipe/validation.pipe';
import { Result } from '../../interface/result.interface';
import { AuthGuard } from '@nestjs/passport';
import { MessageService } from './message.service';

@Controller('/message')
export class MessageController {
    constructor(
        private readonly messageService: MessageService,
    ) { }

    @Get('/list')
    @UsePipes(new ValidationPipe())
    @UseGuards(AuthGuard('jwt'))
    public async list(@Query() id: number, @Request() request: any): Promise<Result> {
        return this.messageService.list(id, request);
    }

    @Post('/add')
    @UsePipes(new ValidationPipe())
    @UseGuards(AuthGuard('jwt'))
    public async add(@Body() data: any,): Promise<Result> {
        return this.messageService.add(data);
    }
}
