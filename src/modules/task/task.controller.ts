/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Post, UseGuards, Body, Request } from '@nestjs/common';
import { TaskService } from './task.service';
import { AuthGuard } from '@nestjs/passport';
import { TaskAddDTO } from './dto/task-add.dto';
import { Result } from '../../interface/result.interface';

@Controller('task')
export class TaskController {
    constructor(
        private readonly taskService: TaskService
    ) { }

    @Post('/add')
    @UseGuards(AuthGuard('jwt'))
    public async taskAdd(@Body() taskAddDTO: TaskAddDTO, @Request() request: any): Promise<Result> {
        return this.taskService.taskAdd(taskAddDTO, request);
    }
}
