import { Controller, Get, Body, Patch, UseGuards, Req } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/user-update.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserDetailDto } from './dto/user-detail.dto';
import type { Request } from 'express';
import { UserEntity } from './user.entity';

@ApiTags('user')
@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}
  @Get('detail')
  @ApiResponse({
    status: 200,
    description: '获取用户详情',
    type: UserDetailDto,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  getUserDetail(@Req() req: Request) {
    const { password, id, ...user } = req.user as UserEntity;
    return user;
  }

  @Patch()
  public async update(
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
  ) {
    // 这里只能修改自己的内容
    const { uid } = req.user as UserEntity;
    // todo
    return this.userService.update(uid, updateUserDto);
  }
}
