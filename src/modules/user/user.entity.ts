import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: '用户名',
    maxLength: 16,
  })
  @Column({ nullable: true })
  name?: string;

  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsString()
  @IsEmail({}, { message: '邮箱格式不正确' })
  @ApiProperty({
    description: '邮箱',
  })
  @Column({
    unique: true,
  })
  email: string;

  @MaxLength(16)
  @ApiProperty({
    description: '密码',
  })
  @Column({
    nullable: true,
    length: 16,
  })
  password?: string;

  @ApiProperty({
    description: '用户唯一标识',
  })
  @Column({ unique: true, type: 'uuid', name: 'uid' })
  uid: string;

  @ApiProperty({
    description: '头像',
  })
  @Column({
    nullable: true,
  })
  avatar?: string;

  @ApiProperty({
    description: '经验',
    default: 0,
  })
  @Column({
    nullable: true,
    default: 0,
  })
  exp?: number;
}
