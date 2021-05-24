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


    /**
     * 查询消息历史消息
     * 默认去最近30条数据
     * @param body 
     */
    async list(body: any): Promise<any> {
        try {
            const { userId } = body;
            const doc = await this.messageRepository.find({
                where: {
                    'sendId': userId,
                    'receiveId': userId
                },
                cache: true,
                order: {
                    sendDate: 'DESC'
                },
                take: 30
            });
            return {
                code: 10000,
                data: doc,
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
     * 添加消息
     * @param body 
     */
    async add(body: PostBody): Promise<any> {
        try {
            const { content, sendId, receiveId } = body;
            const message = new Message();
            message.content = content;
            message.sendId = sendId;
            message.receiveId = receiveId;
            message.sendDate = new Date();
            const doc = await this.messageRepository.save(message);
            return {
                code: 10000,
                data: doc,
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
