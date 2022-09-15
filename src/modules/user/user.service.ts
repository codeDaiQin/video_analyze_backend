import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/user-update.dto';
import { UserEntity } from './user.entity';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async findAll() {
    const users = await this.userRepository.find();

    return {
      users,
    };
  }

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
    return await this.userRepository.update({ uid }, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
