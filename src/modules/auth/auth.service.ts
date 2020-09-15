import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
// JwtService 不是全局服务 只有引入JwtModule 的模块才可以使用JwtService

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) { }

    /**
    * 验证用户名和密码是否匹配
    * @param username 
    * @param password 
    */
    public async validatePassword(username: string, password: string): Promise<boolean> {
        const user: any = await this.userRepository.findOne({
            username: username
        });
        if (user) {
            return password === user.password;
        }
        return true;
    }
}
