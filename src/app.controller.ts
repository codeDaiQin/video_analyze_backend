import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import {
  ApiBody,
  ApiConsumes,
  ApiProperty,
  ApiPropertyOptional,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

export class NewUser {
  @ApiProperty()
  name: string;

  // ApiProperty => required: false === ApiPropertyOptional
  @ApiProperty({
    description: 'The age of a user',
    minimum: 1,
    default: 1,
    required: false,
  })
  age: number;

  @ApiPropertyOptional({
    enum: ['admin', 'guest'],
    default: 'guest',
  })
  role: string;
}

class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

@ApiTags('default')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully created.',
    type: NewUser,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  addUser(@Body() newUser: NewUser) {
    return newUser;
  }

  // @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'List of cats',
    type: FileUploadDto,
  })
  uploadFile(@UploadedFile() file) {
    console.log(file);
  }
}
