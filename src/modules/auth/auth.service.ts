import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from '@/modules/user/user.entity';

@Injectable()
@UseGuards(AuthGuard('jwt'))
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(userId: string): Promise<UserEntity> {
    return null;
  }

  public generateTokens(payload: { id: number }): { accessToken: string } {
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<string>('JWT_EXPIRESIN'),
      }),
    };
  }

  public async login() {
    return 1;
  }
}
