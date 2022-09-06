import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { UserEntity } from '@/modules/user/user.entity';
import { UserService } from '../user/user.service';
import { JwtDto } from './dto/jwt.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('token'),
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtDto): Promise<UserEntity> {
    const { uid, exp, iat } = payload;
    console.log(payload, 'payload');

    // const token = this.authService.generateToken(uid);
    // console.log(token);

    const user = await this.userService.findById(uid);
    console.log(user, payload, 'auth');
    if (!user) {
      throw new UnauthorizedException();
    }
    return {
      id: 1,
      email: '123',
      name: ',,c',
    };
  }
}
