import { IMAGE_MIMETYPE } from '@/constants/mimetype';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import * as md5 from 'md5';
import { UploadType } from './dto/upload.dto';

@Injectable()
export class UploadService {
  public saveFile(type: UploadType, uid: string, file: Express.Multer.File) {
    const path = join('./static/', uid);
    // 检查用户 资源目录是否存在 方便用户注销时直接删除
    if (!existsSync(path)) {
      mkdirSync(path);
    }
    console.log(file, 'file');

    const { originalname, mimetype, buffer } = file;

    if (type === UploadType.AVATAR && !IMAGE_MIMETYPE.includes(mimetype)) {
      throw new HttpException('只能传图片', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // 计算md5值 防止重复存储
    const fileName = `${md5(buffer)}.${originalname.split('.').pop()}`;

    if (!existsSync(fileName)) {
      writeFileSync(join(path, fileName), buffer);
    }

    return fileName;
  }
}
