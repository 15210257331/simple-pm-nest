import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostBody } from '../../interface/post-body.interface';
import { Like, Repository } from 'typeorm';
import { Message } from '../../entity/message.entity';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message) private readonly messageRepository: Repository<Message>,
    ) { }



    async list(body: any): Promise<any> {
        try {
            // const doc = await this.messageRepository.find();
            return {
                code: 10000,
                data: [],
                msg: 'Success',
            };
        } catch (error) {
            return {
                code: 9999,
                msg: error,
            };
        }
    }

    /**
     * 分页角色列表
     * @param body 
     */
    async add(body: PostBody): Promise<any> {
        try {
            const { name, page, size } = body;
            // const [doc, count] = await this.messageRepository.findAndCount({
            //     where: {
            //         'name': Like(`%${name}%`),
            //     },
            //     cache: true,
            //     order: {
            //         createDate: 'DESC' //ASC 按时间正序 DESC 按时间倒序
            //     },
            //     skip: (page - 1) * size,
            //     take: size,
            // });
            return {
                code: 10000,
                data: {
                    
                },
                msg: 'success',
            };
        } catch (error) {
            return {
                code: 9999,
                msg: error,
            };
        }
    }

}
