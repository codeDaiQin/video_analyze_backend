import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly authService: AuthService,
  ) {}

  public async create(createUser: CreateUserDto) {
    // 检查账号是否存在
    if (await this.findByEmail(createUser.email)) {
      return {
        message: '已经存在',
      };
    }

    const user = await this.userRepository.save(createUser);
    return user;
  }

  public async findAll() {
    const users = await this.userRepository.find();

    return {
      users,
      // token: this.authService.generateTokens({ id: 1 }),
    };
  }

  public async findById(id: string) {
    // const [err, user] = await to();
    return `This action returns a #${id} user`;
  }

  public async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({
      email,
    });

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
