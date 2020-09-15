import { Injectable } from '@nestjs/common';
import { TaskDTO } from './dto/task.dto';
import { Result } from '../../interface/result.interface';

@Injectable()
export class TaskService {

    async taskAdd(taskDTO: TaskDTO): Promise<Result> {
        return {
            code: 10000,
            message: 'success'
        }
    }
}
