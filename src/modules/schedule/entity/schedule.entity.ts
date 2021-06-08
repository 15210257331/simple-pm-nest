import { Project } from '../../project/entity/project.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../user/entity/user.entity';
/**
 * 实体对应数据库中的表 字段类型会类比映射到数据库支持的类型
 * 你也可以通过在@Column装饰器中隐式指定列类型来使用数据库支持的任何列类型
 */
@Entity()
export class Schedule {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({
        comment: '名称',
        type: 'text',
        nullable: false,
        name: 'name',
        charset: 'utf8mb4',
    })
    name: string;

    @Column({
        comment: '内容',
        type: 'text',
        name: 'description',
        charset: 'utf8mb4',
    })
    content: string;

    @CreateDateColumn({
        type: 'timestamp',
        nullable: false,
        name: 'createDate',
        comment: '创建时间',
    })
    createDate: Date;

    @CreateDateColumn({
        type: 'timestamp',
        nullable: true,
        name: 'startDate',
        // default: Date.now,
        comment: '开始时间',
    })
    startDate: Date;

    @CreateDateColumn({
        type: 'timestamp',
        nullable: true,
        name: 'endDate',
        // default: Date.now,
        comment: '结束时间',
    })
    endDate: Date;

    /**
     * 日程和创建人是多对一的关系
     * 拥有@JoinColumn()的表生成外键
     * 名称为creatorId
     */
    @ManyToOne(() => User, user => user.createProjects)
    @JoinColumn()
    creator: User;

    /**
    * 参与人员和日程之间的多对多关系
    * */
    @ManyToMany(() => User, user => user.participateSchedules)
    @JoinTable({
        name: 'schedule_user' // 自定义关联表名称
    })
    participant: User[];
}
