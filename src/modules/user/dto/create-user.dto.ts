import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// Data Transfer Object（数据传输对象）
export class CreateUserDto {
  @ApiProperty({
    description: '用户名',
    maxLength: 16,
  })
  name: string;

  // ApiProperty => required: false === ApiPropertyOptional
  @ApiProperty({
    description: '邮箱',
  })
  email: string;

  // @ApiPropertyOptional({
  //   description: '权限',
  //   enum: {
  //     0: '游客',
  //     1: '管理员',
  //     '-1': '超级管理员',
  //   },
  //   default: 0,
  // })
  // role: string;
}
