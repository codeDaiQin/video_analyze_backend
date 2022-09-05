import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { JwtDto } from './dto/jwt.dto';
import { UserEntity } from '@/modules/user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('token'),
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtDto): Promise<UserEntity> {
    const user = await this.authService.validateUser(payload.userId);
    console.log(user, 'auth');
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
