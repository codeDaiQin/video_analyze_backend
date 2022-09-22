import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from '@/modules/user/user.entity';
import { UserService } from '../user/user.service';
import { JwtDto } from './dto/jwt.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('token'),
      ignoreExpiration: false, // 如果为 true，则不验证到期的令牌
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtDto): Promise<UserEntity> {
    const { uid, exp, iat } = payload;

    const user = await this.userService.findByUid(uid);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
