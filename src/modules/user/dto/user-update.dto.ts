import { PartialType, PickType } from '@nestjs/swagger';
import { UserEntity } from '../user.entity';

export class UpdateUserDto extends PartialType(
  PickType(UserEntity, ['id', 'uid']),
) {}
