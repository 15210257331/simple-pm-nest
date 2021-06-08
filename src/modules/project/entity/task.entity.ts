import { Project } from './project.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable, OneToOne, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Type } from './type.entity';
import { Tag } from './tag.entity';
import { Comment } from './comment.entity'
/**
 * 实体对应数据库中的表 字段类型会类比映射到数据库支持的类型
 * 你也可以通过在@Column装饰器中隐式指定列类型来使用数据库支持的任何列类型
 */
@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({
        type: 'text',
        nullable: false,
        unique: false,
        charset: 'utf8mb4',
        name: 'name',
        comment: '任务名称',
    })
    name: string;

    @Column({
        type: 'text',
        nullable: false,
        name: 'content',
        charset: 'utf8mb4',
        comment: '任务内容',
    })
    content: string;

    @Column({
        type: 'int',
        name: 'status',
        default: 1,
        nullable: false,
        comment: '任务状态 1未开始  2进行中  3已完成  4已作废  5 已删除'
    })
    status: number;

    @Column({
        type: 'varchar',
        nullable: true,
        name: 'number',
        comment: '项目编号'
    })
    number: string;

    @CreateDateColumn({
        type: 'timestamp',
        nullable: false,
        name: 'createTime',
        comment: '任务创建时间',
    })
    createTime: Date;

    @CreateDateColumn({
        type: 'timestamp',
        nullable: false,
        name: 'startTime',
        comment: '任务开始时间',
    })
    startTime: Date;

    @CreateDateColumn({
        type: 'timestamp',
        nullable: false,
        name: 'endTime',
        comment: '任务结束时间',
    })
    endTime: Date;

    /**
     * 任务和任务负责人是多对一的关系
     */
    @ManyToOne(() => User,)
    @JoinColumn()
    principal: User;

    /**
     * 任务和项目是多对一的关系 
     * ManyToOne 可以省略JoinColumn装饰器
     * 拥有ManyToOne装饰器的表会生成外键
     * 外键默认名称是 字段名+关联的表的主键名
     * 如果不特殊指定那这里的外键是 projectId
     */
    @ManyToOne(() => Project, project => project.tasks)
    @JoinColumn()
    project: Project;
    
    /**
     * 任务和类型是多对多的关系
     */
    @ManyToOne(() => Type, type => type.tasks)
    @JoinColumn()
    type: Type;

    /**
     * 任务和标签是多对多的关系
     */
    @ManyToMany(() => Tag, tag => tag.tasks)
    @JoinTable({
        name: 'task_tag' // 自定义关联表名称
    })
    tags: Tag[];

    /**
    * 任务和项目是一对多的关系
    * 该项目下所包含的任务
    *  */
   @OneToMany(() => Comment, comment => comment.task)
   comments: Comment[];
}
