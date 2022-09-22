import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

import { UserDetailDto } from '@/modules/user/dto/user-detail.dto';

export class LoginResponse extends UserDetailDto {
  @ApiProperty({
    description: 'token',
  })
  token: string;
}

// Data Transfer Object（数据传输对象） 我们使用Dto可以很大程度在请求参数校验上做一些自动化的验证功能，这就是Dto的用意
export class LoginDto {
  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsString()
  @IsEmail({}, { message: '邮箱格式不正确' })
  @ApiProperty({
    description: '邮箱',
  })
  email: string;

  @ApiProperty({
    description: '密码',
    maxLength: 16,
  })
  password: string;

  @ApiProperty({
    description: '验证码',
    minLength: 4,
    maxLength: 4,
  })
  code: string;
}
