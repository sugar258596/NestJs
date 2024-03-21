import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { sessionConfig, swaggerConfig } from './configure';

import * as session from 'express-session';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '/images'), {
    prefix: process.env.SERVET_FILE_PREFIX,
  });
  app.useStaticAssets(join(__dirname, '../src/images/static'), {
    prefix: process.env.SERVET_FILE_STATIC,
  });

  // session 配置
  app.use(session(sessionConfig));

  // swagger 配置
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('docs', app, document);
  await app.listen(process.env.SERVET_PORT);
}
bootstrap();
