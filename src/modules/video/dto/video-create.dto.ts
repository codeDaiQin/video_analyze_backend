import { PickType } from '@nestjs/swagger';
import { VideoEntity } from '../video.entity';

export class VideoCreateDto extends PickType(VideoEntity, [
  'resource',
  'cover',
  'title',
  'desc',
]) {}
