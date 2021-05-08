import { Project } from '../../project/entity/project.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Schedule } from '../../schedule/entity/schedule.entity';
import { Role } from '../../role/entity/role.entity';
/**
 * 实体对应数据库中的表 字段类型会类比映射到数据库支持的类型
 * 你也可以通过在@Column装饰器中隐式指定列类型来使用数据库支持的任何列类型
 */
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({
        type: 'varchar',
        nullable: false,
        length: 50,
        unique: true,
        name: 'username',
        comment: '用户名',
    })
    username: string;

    @Column({
        length: 500,
        type: 'varchar',
        nullable: false,
        comment: '密码',
    })
    password: string;

    @Column({
        type: 'varchar',
        length: 50,
        charset: 'utf8mb4',
        comment: '姓名/昵称'
    })
    nickname: string;

    @Column({
        length: 50,
        comment: '邮箱'
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 11,
        comment: '电话'
    })
    phone: number;

    @Column({
        type: 'varchar',
        nullable: false,
        default: 'https://img.blingabc.com/6d1edc49f8ff44a2bb21f20dea806d73.jpg',
        name: 'avatar',
        comment: '头像'
    })
    avatar: string;

    @Column({
        type: 'text',
        comment: '个人介绍',
        name: 'introduction',
        charset: 'utf8mb4',
    })
    introduction: string;

    @Column({
        type: 'int',
        name: 'sex',
        nullable: false,
        enum: [1, 2],
        comment: '性别 1表示男 2表示女'
    })
    sex: number;

    @Column({
        type: 'int',
        name: 'status',
        default: () => 1,
        nullable: false,
        comment: '用户状态 1在职 2离职'
    })
    status: number;

    // 是一个特殊列，自动为实体插入日期。无需设置此列，该值将自动设置
    @CreateDateColumn({
        type: 'timestamp',
        nullable: false,
        name: 'createTime',
        comment: '创建时间',
    })
    createTime: Date;

    /**
     * 创建者和项目是一对多的关系
     * 该成员创建的项目
     *  */
    @OneToMany(() => Project, project => project.creator)
    createProjects: Project[];

    /**
     * 项目的参与者和用户是多对多的关系
     * 该成员参与的项目
     */
    @ManyToMany(() => Project, project => project.members)
    participateProjects: Project[];

    /**
     * 创建者和日程是一对多的关系
     * 该成员创建的日程
     *  */
    @OneToMany(() => Schedule, schedule => schedule.creator)
    schedules: Schedule[];

    /**
     * 日程的参与者和用户是多对多的关系
     * 该成员参与的日程
     */
    @ManyToMany(() => Schedule, schedule => schedule.participant)
    participateSchedules: Schedule[];

    /**
     * 角色和用户是多对多的关系
     */
    @ManyToMany(() => Role, role => role.users,)
    roles: Role[];
}
