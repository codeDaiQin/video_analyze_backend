import { UserEntity } from '@/modules/user/user.entity';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { Length, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto extends PickType(UserEntity, ['email']) {
  @IsNotEmpty({ message: '验证码不能为空' })
  @IsString()
  @Length(4, 4)
  @ApiProperty({
    description: '验证码',
  })
  code: string;
}
