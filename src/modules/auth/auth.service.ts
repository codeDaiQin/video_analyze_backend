import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtDto } from './dto/jwt.dto';

@Injectable()
export class AuthService {
  codesPool: Record<string, number>;
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.codesPool = {};
  }

  private generateToken(uid: string): { accessToken: string } {
    return {
      accessToken: this.jwtService.sign(uid, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<string>('JWT_EXPIRESIN'),
      }),
    };
  }

  // 生成4位验证码
  private async createCode(email: string) {
    const code = (1000 + Math.random() * 9000) >> 0;
    // 检查是否重复
    if (Object.values(this.codesPool).includes(code)) {
      return this.createCode(email);
    }

    // 生成 验证码 过期时间为 10m
    this.codesPool[email] = code;
    setTimeout(() => {
      delete this.codesPool[email];
    }, 1000 * 60 * 10);

    return code;
  }

  // 发送邮件
  private async sendEmail(email: string, content: string) {}

  // 注册
  private async register(createUserDto) {
    const { type, email, code } = createUserDto;

    if (type === 'email') {
      // 校验 验证码
      if (code === this.codesPool[email]) {
        // 注册成功
      }
    }
  }
}
