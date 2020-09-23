import { Project } from './project.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable, OneToOne, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
/**
 * 实体对应数据库中的表 字段类型会类比映射到数据库支持的类型
 * 你也可以通过在@Column装饰器中隐式指定列类型来使用数据库支持的任何列类型
 */
@Entity()
export class Tag {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({
        type: 'char',
        nullable: false,
        length: 50,
        unique: false,
        name: 'name',
        comment: '标签名称',
    })
    name: string;

    @Column({
        type: 'char',
        nullable: false,
        length: 50,
        unique: false,
        name: 'color',
        comment: '标签颜色',
    })
    color: string;


    @Column({
        type: 'int',
        name: 'status',
        nullable: false,
        default: () => 1,
        comment: '标签状态 1表示正常 2表示禁用'
    })
    status: number;

    @CreateDateColumn({
        type: 'timestamp',
        nullable: false,
        name: 'createTime',
        comment: '标签创建时间',
    })
    createTime: Date;

    /**
     * 标签和项目之间的多对多关系 
     * */
    @ManyToMany(() => Project, project => project.types)
    projects: Project[];

}
