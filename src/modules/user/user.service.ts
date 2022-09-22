import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/user-update.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async findByUid(uid: string) {
    const user = await this.userRepository.findOneBy({
      uid,
    });
    return user;
  }

  public async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({
      email,
    });

    return user;
  }

  public async update(uid: string, updateUserDto: UpdateUserDto) {
    const { email } = updateUserDto;

    // 更新邮箱时 防止 冲突
    if (email) {
      const user = await this.findByEmail(email);

      if (user) {
        throw new HttpException('用户已存在', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    return await this.userRepository.update({ uid }, updateUserDto);
  }
}
