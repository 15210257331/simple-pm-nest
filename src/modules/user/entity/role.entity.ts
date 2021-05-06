import { Project } from '../../project/entity/project.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
/**
 * 实体对应数据库中的表 字段类型会类比映射到数据库支持的类型
 * 你也可以通过在@Column装饰器中隐式指定列类型来使用数据库支持的任何列类型
 */
@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({
        comment: '名称',
        type: 'varchar',
        nullable: false,
        length: 50,
        name: 'name',
    })
    name: string;

    @Column({
        comment: '描述',
        type: 'text',
        name: 'description',
        charset: 'utf8mb4',
    })
    description: string;

    @Column({
        type: 'int',
        name: 'valid',
        nullable: false,
        enum: [1, 2],
        comment: '性别 1有效 2无效'
    })
    valid: number;

    @CreateDateColumn({
        type: 'timestamp',
        nullable: false,
        name: 'createDate',
        comment: '创建时间',
    })
    createDate: Date;

    @CreateDateColumn({
        type: 'timestamp',
        nullable: false,
        name: 'updateDate',
        comment: '更新时间',
    })
    updateDate: Date;

    // 有一种称为simple-array的特殊列类型，它可以将原始数组值存储在单个字符串列中
    @Column({
        type: 'simple-array',
        charset: 'utf8mb4',
        comment: '权限',
        name: 'authority',
    })
    authority: string[];
}
