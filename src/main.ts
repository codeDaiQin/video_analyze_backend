import { NestFactory } from '@nestjs/core';
import { NestApplicationOptions, VersioningType, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { HTTPErrorHandle } from './common/errorHandle';

const DEV_ENVS = ['test', 'dev'];

async function bootstrap() {
  const appOptions: NestApplicationOptions = { cors: true, bodyParser: true };
  const app = await NestFactory.create(AppModule, appOptions);
  const configService = app.get<ConfigService>(ConfigService);

  // prefix
  app.setGlobalPrefix('api');

  // errorhandle
  app.useGlobalFilters(new HTTPErrorHandle());

  // 接口版本化管理
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI,
  });

  // 生产环境 swagger api文档
  if (DEV_ENVS.includes(configService.get<string>('NODE_ENV'))) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('video_analyze')
      .setDescription('The API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('docs', app, document);
  }

  await app.listen(3000);
  Logger.log(`Swagger [OpenApi] - 接口文档: ${await app.getUrl()}/docs`);
}
bootstrap();
