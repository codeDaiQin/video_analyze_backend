import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // 登录
  @Post()
  login(@Body() createUserDto: any) {}

  // 注册
  @Post()
  register(@Body() createUserDto: any) {
    return this.register(createUserDto);
  }

  // 忘记密码
  @Post()
  forgetPassWord() {}
}
