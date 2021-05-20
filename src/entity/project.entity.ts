import { Task } from './task.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable, OneToOne, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Type } from './type.entity';
import { Tag } from './tag.entity';
/**
 * 实体对应数据库中的表 字段类型会类比映射到数据库支持的类型
 * 你也可以通过在@Column装饰器中隐式指定列类型来使用数据库支持的任何列类型
 */
@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({
        type: 'char',
        nullable: false, 
        charset: 'utf8mb4',
        length: 50, 
        unique: false, 
        name: 'name', 
        comment: '项目名称',
    })
    name: string;

    @Column({ type: 'text', nullable: false,  charset: 'utf8mb4', name: 'content', comment: '项目内容', })
    content: string;

    @Column({ type: 'bool', name: 'star', default: false, comment: '是否是星标项目' })
    star: string;

    @Column({ type: 'varchar', nullable: true, default: 'https://img.blingabc.com/6d1edc49f8ff44a2bb21f20dea806d73.jpg', name: 'cover', comment: '项目封面' })
    cover: string;

    @Column({ type: 'int', name: 'status', nullable: false, default: () => 1, comment: '项目状态 1表示正常 2表示异常' })
    status: number;

    @CreateDateColumn({ type: 'timestamp', nullable: false, name: 'createTime', comment: '项目创建时间', })
    createTime: Date;

    /**
     * 项目创建人
     * 项目和创建人是多对一的关系 
     * ManyToOne 可以省略JoinColumn装饰器
     * 拥有ManyToOne装饰器的表会生成外键
     * 外键默认名称是 字段名+关联的表的主键名
     * 如果不特殊指定那这里的外键是 creatorId
     */
    @ManyToOne(() => User, user => user.createProjects)
    @JoinColumn()
    creator: User;

    /**
     * 项目成员
     * 成员和项目之间的多对多关系
     * */
    @ManyToMany(() => User, user => user.participateProjects)
    @JoinTable({
        name: 'project_user' // 自定义关联表名称
    })
    members: User[];

    /**
     * 项目类型
     * 项目类型和项目之间的多对一关系
     *  
     * */
    @OneToMany(() => Type, type => type.project)
    types: Type[];

    /**
     * 项目标签
     * 项目标签和项目之间的多对多关系
     *  
     * */
    @OneToMany(() => Tag, tag => tag.project)
    tags: Tag[];

    /**
    * 任务和项目是一对多的关系
    * 该项目下所包含的任务
    *  */
    @OneToMany(() => Task, task => task.project)
    tasks: Task[];
}
