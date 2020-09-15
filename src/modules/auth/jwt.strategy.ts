/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
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

    async validate(payload: any) {
        console.log('执行了 JwtStrategy');
        // console.log(payload)
        // 此方法返回的payload将创建一个user对象将会附加到请求对象上
        return payload;
    }
}
