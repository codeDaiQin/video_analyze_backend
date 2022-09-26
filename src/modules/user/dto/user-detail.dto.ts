import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../user.entity';

// Data Transfer Object（数据传输对象）
export class UserDetailDto extends PickType(UserEntity, [
  'uid',
  'avatar',
  'email',
  'exp',
  'name',
]) {}
