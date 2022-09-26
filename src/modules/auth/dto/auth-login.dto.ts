import { ApiProperty, PickType } from '@nestjs/swagger';

import { UserEntity } from '@/modules/user/user.entity';

export class LoginResponse extends UserEntity {
  @ApiProperty({
    description: 'token',
  })
  token: string;
}

// Data Transfer Object（数据传输对象） 我们使用Dto可以很大程度在请求参数校验上做一些自动化的验证功能，这就是Dto的用意
export class LoginDto extends PickType(UserEntity, ['email', 'password']) {
  @ApiProperty({
    description: '验证码',
    minLength: 4,
    maxLength: 4,
  })
  code: string;
}
