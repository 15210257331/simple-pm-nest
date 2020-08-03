import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConfig } from '../../common/config';
/**
 * jwt策略用来解析token
 * *
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, //是否忽略过期时间，正常是false，不忽略过期 
            secretOrKey: jwtConfig.secret,
        });
    }

    async validate({ id, username }: any) {

        console.log(id, username);
        return { id, username };
    }
}
