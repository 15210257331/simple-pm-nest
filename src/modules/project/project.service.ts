/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Project } from './project.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Result } from '../../interface/result.interface';
import { ProjectDTO } from './dto/project.dto';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Injectable()
export class ProjectService {
    constructor(
        @InjectRepository(Project) private readonly projectRepository: Repository<Project>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }



    async projectAdd(projectDTO: ProjectDTO, request: any): Promise<Result> {
        try {
            const project = new Project();
            project.name = projectDTO.name;
            project.content = projectDTO.content;
            project.cover = 'http://www.baidu.com';
            project.creator = await this.userRepository.findOne(request.user.userId);
            project.members = await this.userRepository.findByIds(projectDTO.member);
            const doc = await this.projectRepository.save(project);
            return {
                code: 10000,
                message: 'success',
                data: doc
            }
        } catch (err) {
            return {
                code: 999,
                message: err,
            };
        }

    }

    async getAllProject(): Promise<Result> {
        try {
            const doc = await this.projectRepository.find({ relations: ['creator','members'] });
            return {
                code: 10000,
                message: 'Success',
                data: doc
            };
        } catch (err) {
            return {
                code: 999,
                message: err,
            };
        }
    }
}
