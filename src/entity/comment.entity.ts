import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Task } from './task.entity';
import { User } from './user.entity';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        comment: '内容',
        type: 'text',
        name: 'content',
        charset: 'utf8mb4',
    })
    content: string;

    @CreateDateColumn({
        type: 'timestamp',
        nullable: true,
        name: 'createDate',
        // default: Date.now,
        comment: '发送时间',
    })
    createDate: Date;
    
    /**
     * 评论的作者 单连接
     */
    @ManyToOne(() => User,)
    @JoinColumn()
    author: User;

    /**
     * 评论和任务是多对一的关系
     */
    @ManyToOne(() => Task, task => task.comments)
    @JoinColumn()
    task: Task;
} 
