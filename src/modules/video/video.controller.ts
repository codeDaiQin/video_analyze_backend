import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';

import { PageOptionsDto } from '@/common/dto/pageOptions.dto';
import { UserEntity } from '../user/user.entity';
import { VideoCreateDto } from './dto/video-create.dto';
import { VideoEntity, VideoListResponse } from './video.entity';
import { VideoService } from './video.service';

@ApiTags('video')
@UseGuards(AuthGuard('jwt'))
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  @ApiOperation({ summary: '视频列表' })
  @ApiResponse({
    status: 200,
    description: '视频资源详情',
    type: VideoListResponse,
  })
  getAll(@Query() params: PageOptionsDto) {
    const { pageNum, pageSize } = params;

    return this.videoService.getVideoResourceList(params);
  }

  @Post()
  @ApiOperation({ summary: '创建视频' })
  @ApiResponse({
    status: 200,
    description: '视频资源详情',
    type: VideoEntity,
  })
  add(@Body() newResource: VideoCreateDto, @Req() req: Request) {
    // 获取作者信息
    const { uid, name } = req.user as UserEntity;

    return this.videoService.createVideoResource(newResource, name, uid);
  }
}
