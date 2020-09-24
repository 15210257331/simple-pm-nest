/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, Like } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { makeSalt, encryptPassword } from '../../common/cryptogram';
import { Result } from '../../interface/result.interface';
import { PostBody } from '../../interface/post-body.interface';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }

    async login(loginDTO: LoginDTO): Promise<any> {
        const { username, password } = loginDTO;
        const doc = await this.userRepository.findOne({ username: username });
        if (doc) {
            if (doc.password === password) {
                const payload = {
                    username: username,
                    userId: doc.id
                }
                return {
                    code: 10000,
                    msg: '登录成功',
                    token: this.jwtService.sign(payload),
                }
            } else {
                return {
                    code: 9999,
                    msg: '密码错误',
                }
            }

        } else {
            return {
                code: 9999,
                msg: '用户名不存在',
            }
        }
    }

    async getUserInfo(request: any): Promise<Result> {
        try {
            const doc = await this.userRepository.findOne(request.user.userId);
            return {
                code: 10000,
                data: doc,
                msg: 'success'
            }
        } catch (error) {
            return {
                code: 999,
                msg: error
            }
        }
    }

    async register(registerDTO: RegisterDTO): Promise<any> {
        const doc = await this.userRepository.findOne({ username: registerDTO.username });
        if (doc) {
            return {
                code: 9999,
                msg: '用户已存在'
            }
        }
        const salt = makeSalt(); // 制作密码盐
        const hashPwd = encryptPassword(registerDTO.password, salt); // 加密后的密码
        try {
            const data = new User();
            data.username = registerDTO.username;
            data.password = registerDTO.password;
            data.nickname = registerDTO.nickname;
            data.email = registerDTO.email;
            data.phone = registerDTO.phone;
            data.sex = 1;
            data.introduction = registerDTO.introduction;
            data.role = ['admin', '超级管理员']
            await this.userRepository.insert(data);
            return {
                code: 10000,
                msg: 'Success',
            };
        } catch (error) {
            return {
                code: 9999,
                msg: error,
            };
        }
    }

    async userList(body: PostBody): Promise<Result> {
        try {
            const doc = await this.userRepository.find({
                where: {
                    'nickname': Like(`%${body.name}%`),
                },
            })
            return {
                code: 10000,
                data: doc,
                msg: 'success',
            };
        } catch (error) {
            return {
                code: 9999,
                msg: error,
            };
        }
    }

    async deleteUser(id: string): Promise<any> {
        return await this.userRepository.delete(id)
    }

    async findOne(id: number): Promise<any> {
        return await this.userRepository.findOne(id);
    }
}
