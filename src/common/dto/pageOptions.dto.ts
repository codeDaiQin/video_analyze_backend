import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';
import { toNumber } from '../helper/transform';

export class PageOptionsDto {
  @Transform(({ value }) => toNumber(value, { default: 20, max: 20 }))
  @IsNumber()
  @ApiProperty({
    description: '每页数量',
  })
  pageSize?: number;

  @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
  @IsNumber()
  @ApiProperty({
    description: '页数',
    default: 1,
  })
  pageNum?: number;
}
