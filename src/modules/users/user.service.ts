import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { LoginDTO, RegisterInfoDTO } from './user.dto';
import { JwtService } from '@nestjs/jwt';
import { makeSalt, encryptPassword } from '../../common/cryptogram';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }

    async login(data: LoginDTO): Promise<any> {
        const { username, password } = data;
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
                    code: 999,
                    msg: '密码错误',
                }
            }

        } else {
            return {
                code: 999,
                msg: '用户名不存在',
            }
        }
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async getUserInfo(username: any): Promise<any> {
        return await this.userRepository.findOne({
            username: username
        });
    }

    async register(data: RegisterInfoDTO): Promise<any> {
        const doc = await this.userRepository.findOne({ username: data.username });
        if (doc) {
            return {
                code: 10000,
                msg: '用户已存在'
            }
        }
        const salt = makeSalt(); // 制作密码盐
        const hashPwd = encryptPassword(data.password, salt); // 加密后的密码
        try {
            await this.userRepository.insert(data)
            return {
                code: 10000,
                msg: 'Success',
            };
        } catch (error) {
            return {
                code: 999,
                msg: error,
            };
        }
    }

    async userList(): Promise<any> {
        return await this.userRepository.find();
    }

    async deleteUser(id: string): Promise<any> {
        return await this.userRepository.delete(id)
    }
}
