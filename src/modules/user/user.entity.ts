import { Project } from '../project/project.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
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
        comment: '姓名/昵称'
    })
    nickname: string;

    @Column({
        length: 50,
        comment: '邮箱'
    })
    email: string;

    @Column({
        type: 'int',
        comment: '电话'
    })
    phone: number;

    @Column({
        type: 'varchar',
        nullable: false,
        //default: () => 'asdfasdfasdfdsadsf',
        name: 'avatar',
        comment: '头像'
    })
    avatar: string;

    @Column({
        type: 'text',
        comment: '个人介绍',
        name: 'introduction'
    })
    introduction: string;

    @Column({
        type: 'int',
        name: 'sex',
        nullable: false,
        comment: '性别 1表示男 2表示女'
    })
    sex: number;

    @Column({
        type: 'int',
        name: 'status',
        default: () => 1,
        nullable: false,
        comment: '用户状态 1标识在职 2表示离职'
    })
    status: number;

    @CreateDateColumn({
        type: 'timestamp',
        nullable: false,
        name: 'createTime',
        comment: '创建时间',
    })
    createTime: Date;

    @Column({
        comment: '用户角色'
    })
    role: string;

    /**
     * 成员和项目是一对多的关系
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
}
