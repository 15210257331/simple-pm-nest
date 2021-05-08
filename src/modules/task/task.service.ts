import { Project } from '../project/entity/project.entity';
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable, Request } from '@nestjs/common';
import { TaskAddDTO } from './dto/task-add.dto';
import { Result } from '../../interface/result.interface';
import { Task } from './entity/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { generate8Code } from '../../common/utils';
import { User } from '../user/entity/user.entity';

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Project) private readonly projectRepository: Repository<Project>,
    ) { }

    async taskAdd(taskAddDTO: TaskAddDTO, request: any): Promise<Result> {
        try {
            const task = new Task();
            task.name = taskAddDTO.name;
            task.content = taskAddDTO.content;
            task.number = generate8Code(8);
            task.status = 1;
            task.principal = await this.userRepository.findOne(request.user.userId);
            task.project = await this.projectRepository.findOne(taskAddDTO.projectId);
            const doc = await this.taskRepository.save(task);
            return {
                code: 10000,
                data: doc,
                msg: 'success'
            }
        } catch (err) {
            return {
                code: 9999,
                msg: err
            }
        }
    }
}
