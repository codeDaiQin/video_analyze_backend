import { UserDetailDto } from '@/modules/user/dto/user-detail.dto';
import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty({
    description: '用户详情',
  })
  user: UserDetailDto;

  @ApiProperty({
    description: 'token',
  })
  token: string;
}

// Data Transfer Object（数据传输对象）
export class LoginDto {
  @ApiProperty({
    description: '邮箱',
  })
  email: string;

  @ApiProperty({
    description: '密码',
    maxLength: 16,
  })
  password: string;
}
