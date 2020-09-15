import { Project } from './../project/project.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';
/**
 * 实体对应数据库中的表 字段类型会类比映射到数据库支持的类型
 * 你也可以通过在@Column装饰器中隐式指定列类型来使用数据库支持的任何列类型
 */
@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({
        type: 'varchar',
        nullable: false,
        length: 50,
        unique: false,
        name: 'name',
        comment: '任务名称',
    })
    name: string;

    @Column({
        length: 500,
        type: 'varchar',
        nullable: false,
        name: 'content',
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
    status: string;

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

    @Column({
        type: 'varchar',
        nullable: true,
        name: 'tag',
        comment: '任务标签'
    })
    tag: string;

    /**
     * 任务和任务负责人是多对一的关系
     */
    @ManyToOne(() => User)
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
}
