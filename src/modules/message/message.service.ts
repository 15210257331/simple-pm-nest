import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostBody } from '../../interface/post-body.interface';
import { Like, Repository } from 'typeorm';
import { Message } from './entity/message.entity';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message) private readonly messageRepository: Repository<Message>,
    ) { }


    /**
     * 查询和某个好友消息历史消息
     * 默认最近30条数据
     * @param body 
     */
    async list(id: number, request: any): Promise<any> {
        try {
            const doc = await this.messageRepository.createQueryBuilder("message")
                .where("message.sendId = :sendId", { sendId: request.user.userId })
                .orWhere("message.receiveId = :receiveId", { receiveId: id })
                .orderBy("message.sendDate", "DESC")
                .limit(30)
                .getMany();
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

    /**
     * 新建消息
     * @param body 
     */
    async add(body: PostBody): Promise<any> {
        try {
            const { content, type, sendId, receiveId } = body;
            const message = new Message();
            message.content = content;
            message.sendId = sendId;
            message.type = type;
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
