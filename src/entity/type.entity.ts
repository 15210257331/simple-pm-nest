import { Project } from './project.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { Task } from './task.entity';
/**
 * 实体对应数据库中的表 字段类型会类比映射到数据库支持的类型
 * 你也可以通过在@Column装饰器中隐式指定列类型来使用数据库支持的任何列类型
 */
@Entity()
export class Type {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({
        type: 'char',
        nullable: false,
        length: 50,
        unique: false,
        name: 'name',
        comment: '类型名称',
    })
    name: string;


    @Column({
        type: 'int',
        name: 'status',
        nullable: false,
        default: () => 1,
        comment: '类型状态 1表示正常 2表示禁用'
    })
    status: number;

    @CreateDateColumn({
        type: 'timestamp',
        nullable: false,
        name: 'createTime',
        comment: '项目创建时间',
    })
    createTime: Date;

    /**
     * 所属于的项目
     * 项目类型和项目之间的多对一关系
     *  
     * */
    @ManyToOne(() => Project, project => project.types)
    @JoinColumn()
    project: Project;


    /**
     * 任务和类型是多对多的关系
     */
    @ManyToMany(() => Task, task => task.types)
    tasks: Task[];

}
