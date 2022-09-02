import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  public async create(user: CreateUserDto) {
    // 检查账号是否存在
    if (await this.findByEmail(user.email)) {
    }
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findById(id: string) {
    return `This action returns a #${id} user`;
  }

  public async findByEmail(email: string, forPasswordVerification?: boolean) {
    // let query = this.usersModel.findOne({ email });

    if (forPasswordVerification) {
      // query = query.select('+salt +password');
    }

    return {
      email,
      id: Math.random(),
      name: new Date(),
    };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
