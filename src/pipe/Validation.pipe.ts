import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: never, { metatype }: ArgumentMetadata) {
    /**
     * @name 验证配置
     * @see https://docs.nestjs.com/techniques/validation
     */
    const [error] = await validate(plainToInstance(metatype, value), {
      skipNullProperties: true,
    });

    if (error) {
      const msg = Object.values(error.constraints).pop(); // 只需要取第一个错误信息并返回即可
      Logger.error(`Validation failed: ${msg}`);
      throw new BadRequestException(`Validation failed: ${msg}`);
    }

    return value;
  }
}
