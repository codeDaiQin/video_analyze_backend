import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createReadStream, existsSync } from 'fs';
import { v4 } from 'uuid';
import { VideoEntity } from './video.entity';
import { VideoCreateDto } from './dto/video-create.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PageOptionsDto } from '@/common/dto/pageOptions.dto';
import { pageOptions } from '@/common/helper/transform';
import { VideoUpdateDto } from './dto/video-update.dto';

import type { Response } from 'express';
import { join } from 'path';

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(VideoEntity)
    private readonly videoRepository: Repository<VideoEntity>,
  ) {}
  private formatTime(seconds: number): `${string}:${string}:${string}` {
    const h = Math.floor(seconds / 3600);
    seconds %= 3600;
    const m = Math.floor(seconds / 60);
    seconds %= 60;

    return `${h > 9 ? h : '0' + h}:${m > 9 ? m : '0' + m}:${
      seconds > 9 ? seconds : '0' + seconds
    }`;
  }

  // 生成视频的关键帧gif
  public async generateKeyFrameGif(name: string) {
    console.log('getVideoResource');
  }

  /** 获取视频资源 以流形式返回 */
  public async getVideoResource({
    fileName,
    response,
    uid,
  }: {
    fileName: string;
    response: Response;
    uid: string;
  }) {
    const filePath = join('./static/', uid, fileName);

    // 检查用户 资源目录是否存在 方便用户注销时直接删除
    if (!existsSync(filePath)) {
      throw new HttpException('资源不存在', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const fileStream = createReadStream(filePath);
    return fileStream.pipe(response);
  }

  // 创建视频资源
  public async createVideoResource(
    newResource: VideoCreateDto,
    authorName: string,
    authorUid: string,
  ) {
    const uid = v4();
    const time = new Date().getTime();

    return await this.videoRepository.save({
      ...newResource,
      authorName,
      authorUid,
      uid,
      lastUpdateTime: time,
      createTime: time,
    });
  }

  // 获取视频资源列表
  public async getVideoResourceList(params: PageOptionsDto) {
    const [data, total] = await this.videoRepository.findAndCount(
      pageOptions(params),
    );

    return {
      data,
      total,
    };
  }

  // 更新视频资源
  public async updateVideoResource(
    videoUid: string,
    authorUid: string,
    newResource: VideoUpdateDto,
  ) {
    const videoResource = await this.videoRepository.findOneBy({
      uid: videoUid,
    });

    if (!videoResource) {
      // 找不到
    }

    if (videoResource.authorUid !== authorUid) {
      // 没权限
    }

    return await this.videoRepository.update(
      { uid: videoUid },
      {
        ...newResource,
        lastUpdateTime: new Date().getTime(),
      },
    );
  }

  // 删除视频资源
  public async deleteVideoResource(videoUid: string, authorUid: string) {
    const video = await this.videoRepository.findOneBy({ uid: videoUid });
    if (!video) {
      throw new HttpException('找不到资源', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if (video.authorUid === authorUid) {
      return await this.videoRepository.delete({ uid: videoUid });
    }
    throw new HttpException('权限不足', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
