import { Injectable } from '@nestjs/common';
import { getVideoDurationInSeconds } from 'get-video-duration';
import { existsSync } from 'fs';

@Injectable()
export class VideoService {
  public async download(url: string) {
    console.log(url);
  }

  // 生成视频的关键帧gif
  public async generateKeyframeGif(name: string) {
    const path = name.startsWith('http') ? name : `static/video/${name}`;

    if (!name.startsWith('http') && !existsSync(path)) {
      return `file: ${name} not fond`;
    }

    // 获取总时长
    const time = await getVideoDurationInSeconds(path);
    return time;
  }
}
