import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import type { Request } from 'express';

import { UserEntity } from '../user/user.entity';

import { UploadDto } from './dto/upload.dto';
import { UploadService } from './upload.service';

@ApiTags('文件上传 - 开发中')
@UseGuards(AuthGuard('jwt'))
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  @ApiOperation({ summary: '上传文件' })
  upload(
    @Body() body: UploadDto,
    @Req() req: Request,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const { type } = body;
    const { uid } = req.user as UserEntity;

    return this.uploadService.saveFile(type, uid, file);
  }
}
