import { ApiProperty } from '@nestjs/swagger';
import { Length, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsString()
  @IsEmail({}, { message: '邮箱格式不正确' })
  @ApiProperty({
    description: '邮箱',
  })
  email: string;

  @IsNotEmpty({ message: '验证码不能为空' })
  @IsString()
  @Length(4, 4)
  @ApiProperty({
    description: '验证码',
  })
  code: string;
}
