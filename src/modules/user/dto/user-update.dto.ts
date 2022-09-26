import { OmitType } from '@nestjs/swagger';
import { UserEntity } from '../user.entity';

export class UpdateUserDto extends OmitType(UserEntity, ['id', 'uid']) {}
