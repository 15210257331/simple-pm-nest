import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    username: string;

    @Column({ length: 500 })
    password: string;

    @Column({ length: 50 })
    nickname: string;

    @Column({ length: 50 })
    email: string;

    @Column()
    phone: number;

    @Column()
    avatar: string;

    @Column('text')
    introduction: string;

    @Column()
    sex: number;

    @Column('int')
    status: number;

    @Column()
    role:string;
}
