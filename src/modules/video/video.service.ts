import { Injectable } from '@nestjs/common';
import { getVideoDurationInSeconds } from 'get-video-duration';
import { existsSync, mkdirSync } from 'fs';
import ffmpeg from 'ffmpeg';

const videoExt = ['mp4'];

@Injectable()
export class VideoService {
  public async download(url: string) {
    console.log(url);
  }

  private formatTime(seconds: number) {
    const h = Math.floor(seconds / 3600);
    seconds %= 3600;
    const m = Math.floor(seconds / 60);
    seconds %= 60;
    return h > 9
      ? h
      : '0' +
          h +
          ':' +
          (m > 9 ? m : '0' + m) +
          ':' +
          (seconds > 9 ? seconds : '0' + seconds);
  }

  // 生成视频的关键帧gif
  public async generateKeyframeGif(name: string) {
    const ext = name.split('.').at(-1);
    const fileName = name.slice(0, name.lastIndexOf('.'));
    if (!videoExt.includes(ext)) {
      throw new Error(`.${ext} is not a legal type`);
    }

    const videoPath = `static/video/${name}`;
    if (!existsSync(videoPath)) {
      throw new Error(`file: ${name} not found`);
    }

    // 获取总时长
    const time = await getVideoDurationInSeconds(videoPath);
    // return time;

    // 截取视频各个时间点的截图帧
    for (let i = 0; i < time; i++) {}

    const gifPath = `static/video/TMP_${fileName}.gif`;

    // if (!existsSync(gifPath)) {
    //   mkdirSync(gifPath);
    // }

    // ffmpeg -i capx.mp4 -t 10 -s 320x240 -pix_fmt rgb24 jidu1.gif
    // -t参数表示提取前10秒视频
    // -s 表示按照 320x240的像素提取
    const resolution = '382x216'; // 分辨率
    const command = `ffmpeg -i ${videoPath} -t ${this.formatTime(
      time,
    )} -s ${resolution} -pix_fmt rgb24 ${gifPath}`;

    try {
      const proess = await new ffmpeg(videoPath);
      proess
        .setVideoSize(resolution, true, true, '#fff') // 设置视频大小(分辨率, 保持像素纵横比, 保持长宽比例, 填充颜色)
        .setAudioCodec('libfaac') // 设置音频编解码器
        // .setAudioChannels(2) // 设置音频频道
        .save(gifPath, (error, file) => {
          if (!error) console.log('Video file: ' + file);
        });
    } catch (e) {
      console.log(e);
    }

    return {
      gifPath,
    };
  }
}
