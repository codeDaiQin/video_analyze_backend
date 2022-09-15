import { Controller, Get, Post, Query } from '@nestjs/common';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  getTime(@Query('name') name: string) {
    return this.videoService.generateKeyFrameGif(name);
  }

  @Get('upload')
  upload() {
    return this.videoService.uploadVideo();
  }
}
