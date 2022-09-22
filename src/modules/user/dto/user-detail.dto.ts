import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// Data Transfer Object（数据传输对象）
export class UserDetailDto {
  @ApiProperty({
    description: '用户名',
    maxLength: 16,
  })
  name: string;

  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsString()
  @IsEmail({}, { message: '邮箱格式不正确' })
  @ApiProperty({
    description: '邮箱',
  })
  email: string;

  @ApiProperty({
    description: '用户唯一标识',
  })
  uid: string;

  @ApiProperty({
    description: '头像',
  })
  avatar: string;

  @ApiProperty({
    description: '经验',
  })
  exp: number;
}
