import { PartialType, PickType } from '@nestjs/swagger';
import { VideoEntity } from '../video.entity';

export class VideoUpdateDto extends PartialType(
  PickType(VideoEntity, ['resource', 'cover', 'title', 'desc']),
) {}
