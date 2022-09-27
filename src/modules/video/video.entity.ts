import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length, MaxLength } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'videos' })
export class VideoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty({ message: '标题不能为空' })
  @IsString()
  @Length(4, 64)
  @ApiProperty({
    description: '标题',
    minLength: 4,
    maxLength: 64,
  })
  @Column({ length: 64 })
  title: string;

  @IsNotEmpty({ message: '资源链接不能为空' })
  @MaxLength(256)
  @ApiProperty({
    description: '资源链接',
    maxLength: 256,
  })
  @Column()
  resource: string;

  @ApiProperty({
    description: '作者 uid',
  })
  @Column()
  authorUid: string;

  @ApiProperty({
    description: '作者昵称',
  })
  @Column()
  authorName: string;

  @ApiProperty({
    description: '视频资源唯一标识',
  })
  @Column({ unique: true, type: 'uuid', name: 'uid' })
  uid: string;

  @ApiProperty({
    description: '状态',
    enum: {
      待审核: 0,
      审核通过: 1,
    },
  })
  @Column({
    nullable: true,
    default: 0,
  })
  status?: number;

  @IsNotEmpty({ message: '封面图不能为空' })
  @MaxLength(256)
  @ApiProperty({
    description: '封面图',
    maxLength: 256,
  })
  @Column()
  cover: string;

  @ApiProperty({
    description: '收藏数量',
  })
  @Column({
    nullable: true,
    default: 0,
  })
  collect?: number;

  @ApiProperty({
    description: '点赞数量',
  })
  @Column({
    nullable: true,
    default: 0,
  })
  like?: number;

  @ApiProperty({
    description: '硬币',
  })
  @Column({
    nullable: true,
    default: 0,
  })
  coin?: number;

  @ApiProperty({
    description: '描述',
  })
  @Column({
    length: 256,
  })
  desc: string;

  @ApiProperty({
    description: '创建时间',
  })
  @Column({
    nullable: true,
    default: 0,
  })
  createTime?: number;

  @ApiProperty({
    description: '上次更新时间',
  })
  @Column({
    nullable: true,
    default: 0,
  })
  lastUpdateTime?: number;

  @ApiProperty({
    description: '浏览量',
  })
  @Column({
    nullable: true,
    default: 0,
  })
  pv?: number;
}

export class VideoListResponse {
  @ApiProperty({
    description: '视频资源列表',
    isArray: true,
    name: 'data',
    type: VideoEntity,
  })
  data: any;

  @ApiProperty({
    description: '视频资源总数',
  })
  total: number;
}
