import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import nodemailer from 'nodemailer';
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

  // 验证token
  private async verify(toekn: string) {
    return true;
  }

  // 生成4位验证码
  public async generateCode(email: string) {
    const code = `${(1000 + Math.random() * 9000) >> 0}`;

    // 生成 验证码 过期时间为 10m
    this.codesPool[email] = code;
    setTimeout(() => {
      delete this.codesPool[email];
    }, 1000 * 60 * 10);

    return { code };
  }

  // 发送邮件
  private async sendEmail(email: string, content: string) {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'mmszb@qq.com', // generated ethereal user
        pass: 'liqianyun1226', // generated ethereal password
      },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: 'mmszb@qq.com', // sender address
      to: email, // list of receivers
      subject: 'Hello ✔', // Subject line
      text: content, // plain text body
    });
  }

  // 注册
  public async register(createUser: RegisterDto) {
    const { code, email } = createUser;
    if (!code || !email) {
      throw new Error('请输入正确内容');
    }

    const user = await this.userRepository.findOneBy({ email });
    console.log(createUser, '====', user);

    // 检查账号是否存在
    if (user) {
      throw new Error('存在了哦');
    }

    if (code !== this.codesPool[email]) {
      throw new Error('验证码错误');
    }

    // 先占位成后更新详细信息
    const uid = v4();
    return await this.userRepository.save({ email, uid });
  }

  // 登录
  public async login(params: LoginDto) {
    const data = await this.userRepository.findOneBy({ email: params.email });

    if (!data) {
      throw new Error('用户不存在');
    }

    const { password, id, ...user } = data;

    if (params.password !== password) {
      throw new Error('密码错误');
    }

    const token = this.generateToken(user.uid);

    return {
      user,
      token,
    };
  }
}
