/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, UseGuards, Get, Post, Body, Request, Query, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Result } from '../../interface/result.interface';
import { ProjectService } from './project.service';
import { ProjectAddDTO } from './dto/projectAdd.dto';
import { PostBody } from '../../interface/post-body.interface';
import { ProjectUpdateDTO } from './dto/projectUpdate.dto';
import { ProjectTagAddDTO } from './dto/projectTagAdd.dto';
import { ProjectTypeAddDTO } from './dto/projectTypeAdd.dto';

@Controller('project')
export class ProjectController {

    constructor(
        private readonly projectService: ProjectService,
    ) { }

    // 查询当前用户参与的项目可以按name搜索,按时间倒序排列
    @Post('/list')
    @UseGuards(AuthGuard('jwt'))
    public async projectList(@Body() body: PostBody): Promise<Result> {
        return this.projectService.projectList(body);
    }

    // 新增项目
    @Post('/add')
    @UseGuards(AuthGuard('jwt'))
    public async projectAdd(@Body() projectAddDTO: ProjectAddDTO, @Request() request: any): Promise<Result> {
        return this.projectService.projectAdd(projectAddDTO, request);
    }

    // 更新项目
    @Post('/update')
    @UseGuards(AuthGuard('jwt'))
    public async projectUpdate(@Body() projectUpdateDTO: ProjectUpdateDTO): Promise<Result> {
        return this.projectService.projectUpdate(projectUpdateDTO);
    }

    // 删除项目
    @Get('/delete')
    @UseGuards(AuthGuard('jwt'))
    public async projectDelete(@Query('id') id: number): Promise<Result> {
        return this.projectService.projectDelete(id);
    }

    /**
     * 查询项目详情
     * @param id 
     * 参数以？连接 使用@Query()获取参数
     * ？id= xxx
     */
    @Get('/detail')
    @UseGuards(AuthGuard('jwt'))
    public async projectDetail(@Query('id') id: number): Promise<Result> {
        return this.projectService.projectDetail(id);
    }

    @Post('/tag/add')
    @UseGuards(AuthGuard('jwt'))
    public async projectTagAdd(@Body() projectTagAddDTO: ProjectTagAddDTO): Promise<Result> {
        return this.projectService.projectTagAdd(projectTagAddDTO);
    }

    @Post('/type/add')
    @UseGuards(AuthGuard('jwt'))
    public async projectTypeAdd(@Body() projectTypeAddDTO: ProjectTypeAddDTO): Promise<Result> {
        return this.projectService.projectTypeAdd(projectTypeAddDTO);
    }

    @Post('/member/add')
    @UseGuards(AuthGuard('jwt'))
    public async projectMemberAdd(@Body() body: any): Promise<Result> {
        return this.projectService.projectMemberAdd(body);
    }
}
