import { ApiProperty } from '@nestjs/swagger';

// Data Transfer Object（数据传输对象）
export class UserDetailDto {
  @ApiProperty({
    description: '用户名',
    maxLength: 16,
  })
  name: string;

  @ApiProperty({
    description: '邮箱',
  })
  email: string;

  @ApiProperty({
    description: '用户唯一标识',
  })
  uid: string;
}
