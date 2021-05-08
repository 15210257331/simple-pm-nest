import { Body, Controller, Post, UseGuards, UsePipes, Request, Get, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Result } from '../../interface/result.interface';
import { ValidationPipe } from '../../pipe/validation.pipe';
import { ScheduleAddDTO } from './dto/schedule-add.dto';
import { ScheduleService } from './schedule.service';

@Controller('/schedule')
export class ScheduleController {
    constructor(
        private readonly scheduleService: ScheduleService,
    ) { }

    // 日程列表
    @Get('/list')
    @UsePipes(new ValidationPipe())
    @UseGuards(AuthGuard('jwt'))
    public async scheduleList(@Request() request: any): Promise<Result> {
        return this.scheduleService.scheduleList(request);
    }

    // 添加日程
    @Post('/add')
    @UsePipes(new ValidationPipe())
    @UseGuards(AuthGuard('jwt'))
    public async scheduleAdd(@Body() scheduleAddDTO: ScheduleAddDTO, @Request() request: any): Promise<Result> {
        return this.scheduleService.scheduleAdd(scheduleAddDTO, request);
    }

    // 删除日程
    @Get('/delete/:id')
    @UsePipes(new ValidationPipe())
    @UseGuards(AuthGuard('jwt'))
    public async scheduleDelete(@Param('id') id: number | string): Promise<Result> {
        return this.scheduleService.scheduleDelete(id);
    }
}
