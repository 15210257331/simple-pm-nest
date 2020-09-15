/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, UseGuards, Get, Post, Body, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Result } from '../../interface/result.interface';
import { ProjectService } from './project.service';
import { ProjectDTO } from './dto/project.dto';

@Controller('project')
export class ProjectController {

    constructor(
        private readonly projectService: ProjectService,
    ) { }

    // 新增项目
    @Post('/add')
    @UseGuards(AuthGuard('jwt'))
    public async projectAdd(@Body() projectDTO: ProjectDTO, @Request() request: any): Promise<Result> {
        return this.projectService.projectAdd(projectDTO, request);
    }

    // 查询所有项目
    @Get('/all')
    @UseGuards(AuthGuard('jwt'))
    public async getUserInfo(): Promise<Result> {
        return this.projectService.getAllProject();
    }
}
