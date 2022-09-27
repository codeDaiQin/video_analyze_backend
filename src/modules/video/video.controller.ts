import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
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
import { VideoUpdateDto } from './dto/video-update.dto';

@ApiTags('video')
@UseGuards(AuthGuard('jwt'))
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  @ApiOperation({ summary: '视频资源列表' })
  @ApiResponse({
    status: 200,
    description: '视频资源详情',
    type: VideoListResponse,
  })
  getAll(@Query() params: PageOptionsDto) {
    return this.videoService.getVideoResourceList(params);
  }

  @Post()
  @ApiOperation({ summary: '创建视频资源' })
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

  @Patch(':videoUid')
  @ApiOperation({ summary: '更新视频资源' })
  @ApiResponse({
    status: 200,
    description: '视频资源详情',
    type: VideoEntity,
  })
  update(
    @Body() newResource: VideoUpdateDto,
    @Param('videoUid') videoUid: string,
    @Req() req: Request,
  ) {
    const { uid } = req.user as UserEntity;
    return this.videoService.updateVideoResource(videoUid, uid, newResource);
  }

  @Delete(':videoUid')
  @ApiOperation({ summary: '删除视频资源' })
  @ApiResponse({
    status: 200,
  })
  delete(@Param('videoUid') videoUid: string, @Req() req: Request) {
    const { uid } = req.user as UserEntity;
    return this.videoService.deleteVideoResource(videoUid, uid);
  }
}
