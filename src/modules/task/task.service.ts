import { Injectable } from '@nestjs/common';
import { TaskAddDTO } from './dto/taskAdd.dto';
import { Result } from '../../interface/result.interface';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    ) { }

    async taskAdd(taskAddDTO: TaskAddDTO): Promise<Result> {
        try {
            const task = new Task();
            task.name = taskAddDTO.name;
            task.content = taskAddDTO.content;
            task.number = '#dflkjc';
            const doc = await this.taskRepository.save(task);
            return {
                code: 10000,
                data: doc,
                msg: 'success'
            }
        } catch (err) {
            return {
                code: 999,
                msg: err
            }
        }
    }
}
