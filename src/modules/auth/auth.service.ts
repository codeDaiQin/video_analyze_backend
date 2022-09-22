import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 } from 'uuid';

import { UserEntity } from '../user/user.entity';
import { LoginDto } from './dto/auth-login.dto';
import { RegisterDto } from './dto/auth-register.dto';

@Injectable()
export class AuthService {
  codesPool: Record<string, string>;
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    this.codesPool = {};
  }

  // 生成token
  private generateToken(uid: string): string {
    return this.jwtService.sign(
      { uid },
      {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<string>('JWT_EXPIRESIN'),
      },
    );
  }

  // 生成4位验证码
  public async generateCode(email: string) {
    const code = `${(1000 + Math.random() * 9000) >> 0}`;

    // 生成 验证码 过期时间为 10m
    this.codesPool[email] = code;
    setTimeout(() => {
      delete this.codesPool[email];
    }, 1000 * 60 * 10);

    await this.sendEmail(
      email,
      `您的验证码为: ${code}, 有效期为10分钟, 切勿告诉他人`,
      'Welcome to MMSZB 🐛!',
    );

    return { message: 'ok' };
  }

  // 发送邮件
  private async sendEmail(email: string, content: string, title: string) {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.qq.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: this.configService.get<string>('EMAIL_ADDRESS'), // generated ethereal user
        pass: this.configService.get<string>('EMAIL_PASSWORD'), // generated ethereal password
      },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: this.configService.get<string>('EMAIL_ADDRESS'), // sender address
      to: email, // list of receivers
      subject: title, // Subject line
      text: content, // plain text body
    });
  }

  // 注册
  public async register(createUser: RegisterDto) {
    const { code, email } = createUser;

    const user = await this.userRepository.findOneBy({ email });

    // 检查账号是否存在
    if (user) {
      throw new HttpException('用户已存在', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // 校验 验证码
    if (code !== this.codesPool[email]) {
      throw new HttpException('验证码错误', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // 清除验证码
    delete this.codesPool[email];

    // 先占位, 后续更新详细信息
    const uid = v4();
    return await this.userRepository.save({
      email,
      uid,
    });
  }

  // 登录
  public async login(params: LoginDto) {
    // 这里使用 密码 和 验证码两种登录方式
    const { email, code } = params;
    const data = await this.userRepository.findOneBy({ email });

    if (!data) {
      throw new HttpException('用户不存在', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const { password, id, ...user } = data;

    // 存在 密码时校验
    if (params.password && params.password !== password) {
      throw new HttpException('密码错误', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // 存在 验证码时校验
    if (code && code !== this.codesPool[email]) {
      throw new HttpException('验证码错误', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // 兜底验证 code password 全为空
    if (!code && !params.password) {
      throw new HttpException('搞我？玩阴的', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const token = this.generateToken(user.uid);

    return {
      ...user,
      token,
    };
  }

  // 忘记密码
  public async forgetPassWord(email: string, password: string) {
    return await this.userRepository.update({ email }, { password });
  }
}
