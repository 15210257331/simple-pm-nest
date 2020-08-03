import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }


    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async getUserInfo(username: any): Promise<any> {
        return await this.userRepository.findOne({
            username: username
        });
    }

    async findAll(): Promise<any> {
        return await this.userRepository.find();
    }
}
