import { Controller, Get, Query } from '@nestjs/common';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Get()
  getTime(@Query('name') name: string) {
    return this.videoService.generateKeyframeGif(name);
  }
}
