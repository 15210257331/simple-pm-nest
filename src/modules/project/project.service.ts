/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Project } from './entity/project.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Result } from '../../interface/result.interface';
import { ProjectAddDTO } from './dto/projectAdd.dto';
import { ProjectUpdateDTO } from './dto/projectUpdate.dto';
import { User } from '../user/entity/user.entity';
import { PostBody } from '../../interface/post-body.interface';
import { ProjectTagAddDTO } from './dto/projectTagAdd.dto';
import { Tag } from './entity/tag.entity';
import { Type } from './entity/type.entity';
import { ProjectTypeAddDTO } from './dto/projectTypeAdd.dto';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project) private readonly projectRepository: Repository<Project>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
        @InjectRepository(Type) private readonly typeRepository: Repository<Type>,
    ) { }


    /**
    * 
    * @param body 
    * @param request 
    * 按照name 字段模糊查询
    */
    async projectList(body: PostBody): Promise<Result> {
        try {
            const doc = await this.projectRepository.find({
                where: {
                    'name': Like(`%${body.name}%`),
                },
                relations: ['creator', 'members'],
                order: {
                    createTime: 'DESC' //ASC 按时间正序 DESC 按时间倒序
                }
            });
            return {
                code: 10000,
                msg: 'success',
                data: doc
            }
        } catch (err) {
            return {
                code: 9999,
                msg: err
            }
        }
    }

    async projectAdd(projectAddDTO: ProjectAddDTO, request: any): Promise<Result> {
        try {
            const project = new Project();
            project.name = projectAddDTO.name;
            project.content = projectAddDTO.content;
            project.creator = await this.userRepository.findOne(request.user.userId);
            project.members = await this.userRepository.findByIds(projectAddDTO.member);
            const doc = await this.projectRepository.save(project);
            return {
                code: 10000,
                msg: 'success',
                data: doc
            }
        } catch (err) {
            return {
                code: 9999,
                msg: err,
            };
        }
    }

    /**
     * 更新项目
     * @param projectDTO 
     */
    async projectUpdate(projectUpdateDTO: ProjectUpdateDTO): Promise<Result> {
        try {
            const id = projectUpdateDTO.id;
            const doc = await this.projectRepository.update(id, {
                'name': projectUpdateDTO.name,
                'content': projectUpdateDTO.content,
                'cover': projectUpdateDTO.cover,
            });
            return {
                code: 10000,
                msg: 'success',
                data: doc
            }
        } catch (err) {
            return {
                code: 9999,
                msg: err,
            };
        }
    }
    /**
     *  删除项目
     * @param id  
     */
    async projectDelete(id: number): Promise<Result> {
        try {
            const doc = await this.projectRepository.delete(id);
            return {
                code: 10000,
                msg: 'success',
                data: doc
            }
        } catch (err) {
            return {
                code: 9999,
                msg: err,
            };
        }
    }

    /**
     * 项目详情
     */
    async projectDetail(id: number): Promise<Result> {
        try {
            const doc = await this.projectRepository.findOne(id,{
                relations: ['creator', 'members', 'tasks'],
            });
            return {
                code: 10000,
                msg: 'success',
                data: doc
            }
        } catch (err) {
            return {
                code: 999,
                msg: err,
            };
        }
    }


    /**
     * 添加项目标签
     * @param projectDTO 
     * @param request 
     */
    async projectTagAdd(projectTagAddDTO: ProjectTagAddDTO): Promise<Result> {
        try {
            const tag = new Tag();
            tag.name = projectTagAddDTO.name;
            tag.color = projectTagAddDTO.color;
            tag.projects = await this.projectRepository.findByIds([projectTagAddDTO.id]);
            const doc = await this.tagRepository.create(tag);
            return {
                code: 10000,
                msg: 'success',
                data: doc
            }
        } catch (err) {
            return {
                code: 999,
                msg: err,
            };
        }
    }
    /**
     * 添加项目类型
     * @param projectDTO 
     * @param request 
     */
    async projectTypeAdd(projectTypeAddDTO: ProjectTypeAddDTO): Promise<Result> {
        try {
            const type = new Type();
            type.name = projectTypeAddDTO.name;
            type.projects = await this.projectRepository.findByIds([projectTypeAddDTO.id]);
            const doc = await this.typeRepository.create(type);
            return {
                code: 10000,
                msg: 'success',
                data: doc
            }
        } catch (err) {
            return {
                code: 999,
                msg: err,
            };
        }
    }
}
