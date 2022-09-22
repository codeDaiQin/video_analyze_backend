import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from '../user/dto/user-update.dto';

import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponse } from './dto/auth-login.dto';
import { RegisterDto } from './dto/auth-register.dto';

@ApiTags('auth - 开发中')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  @ApiOperation({ summary: '登录' })
  @ApiResponse({
    status: 200,
    description: '用户详情',
    type: LoginResponse,
  })
  login(@Body() params: LoginDto) {
    return this.authService.login(params);
  }

  @Post('register')
  @ApiOperation({ summary: '注册' })
  @ApiResponse({
    status: 200,
    description: '用户详情',
    type: LoginResponse,
  })
  register(@Body() createUserDto: RegisterDto) {
    return this.authService.register(createUserDto);
  }

  @Post('forgetPassWord')
  @ApiOperation({ summary: '忘记密码' })
  forgetPassWord(@Body() { email, password }: UpdateUserDto) {
    return this.authService.forgetPassWord(email, password);
  }

  @Get('code/:email')
  @ApiOperation({ summary: '获取验证码' })
  @ApiResponse({
    status: 200,
    description: '获取验证码',
  })
  code(@Param('email') email: string) {
    return this.authService.generateCode(email);
  }
}
