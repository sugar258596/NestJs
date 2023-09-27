import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common'
import * as session from 'express-session'

const post: number = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 开启版本控制
  // app.enableVersioning({
  //   type: VersioningType.URI
  // })

  // session
  app.use(session({
    secret: 'tang',
    name: "tang_session",
    cookie: {
      maxAge: 60 * 60 * 24
    }
  }))


  await app.listen(post);
}
bootstrap();
