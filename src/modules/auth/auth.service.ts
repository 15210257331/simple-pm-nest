import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../users/users.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users) private readonly userRepository: Repository<Users>,
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
        return false;
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    async login(user: any): Promise<any> {
        const { username, id } = user;
        const payload = { username, id };
        return {
            token: this.jwtService.sign(payload),
        }
    }
}
