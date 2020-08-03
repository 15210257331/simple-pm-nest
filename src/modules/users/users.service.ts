import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    ) { }


    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async getUserInfo(username: any): Promise<any> {
        return await this.userRepository.findOne({
            username: username
        });
    }


}
