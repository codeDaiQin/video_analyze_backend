import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export enum UploadType {
  AVATAR = 'avatar',
  VIDEO = 'video',
}

export class UploadDto {
  @IsNotEmpty()
  @IsEnum(UploadType)
  @ApiProperty({
    description: '类型',
    enum: UploadType,
  })
  type: UploadType;
}
