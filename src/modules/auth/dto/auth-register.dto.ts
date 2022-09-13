import { ApiProperty } from '@nestjs/swagger';
import {
  validate,
  validateOrReject,
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  Min,
  Max,
  IsNotEmpty,
  IsString,
} from 'class-validator';

// Data Transfer Object（数据传输对象）
export class RegisterDto {
  @ApiProperty({
    description: '邮箱',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: '验证码',
  })
  @IsString()
  @Length(4, 4)
  @IsNotEmpty()
  code: string;
}
