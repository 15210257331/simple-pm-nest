import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        comment: '内容',
        type: 'text',
        name: 'content',
        charset: 'utf8',
    })
    content: string;

    @Column({
        type: 'int',
        name: 'sendId',
        nullable: false,
        comment: '消息发送人ID'
    })
    sendId: number;


    @Column({
        type: 'int',
        name: 'receiveId',
        nullable: false,
        comment: '消息接收人ID'
    })
    receiveId: number;

    @Column({
        type: 'bool',
        name: 'read',
        nullable: false,
        default: () => false,
        comment: '消息阅读状态, 默认未读'
    })
    read: boolean;

    @Column({
        type: 'int',
        name: 'type',
        nullable: false,
        default: () => 1,
        comment: '消息类型 1 文本消息 2 图片'
    })
    type: number;

    @CreateDateColumn({
        type: 'timestamp',
        nullable: false,
        name: 'sendDate',
        comment: '消息发送时间',
    })
    sendDate: Date;
}
