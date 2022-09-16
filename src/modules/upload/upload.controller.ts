import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  upload(@Body() body: any, @UploadedFile() file: any) {
    return {
      file: file.filename,
      path: file.path,
      // 路径请结合前面的main多静态目录来实现 我们只返回文件的相对路径，
      // 为了让外部能够访问 你需要再这里拼上 service 部署的domian地址，
      size: file.size,
    };
  }
}
