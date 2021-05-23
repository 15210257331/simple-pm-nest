import { Project } from './project.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { User } from './user.entity';
/**
 * 实体对应数据库中的表 字段类型会类比映射到数据库支持的类型
 * 你也可以通过在@Column装饰器中隐式指定列类型来使用数据库支持的任何列类型
 */
@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        comment: '内容',
        type: 'text',
        name: 'description',
        charset: 'utf8mb4',
    })
    description: string;

    @Column({
        type: 'int',
        name: 'sendId',
        nullable: false,
        comment: '发送人ID'
    })
    sendId: number;


    @Column({
        type: 'int',
        name: 'receiveId',
        nullable: false,
        comment: 'ID'
    })
    receiveId: number;

    @Column({
        type: 'bool',
        name: 'state',
        nullable: false,
        comment: '消息状态'
    })
    state: number;

    @Column({
        type: 'int',
        name: 'type',
        nullable: false,
        comment: '消息类型'
    })
    type: number;

    @CreateDateColumn({
        type: 'timestamp',
        nullable: true,
        name: 'createDate',
        // default: Date.now,
        comment: '发送时间',
    })
    createDate: Date;

}
