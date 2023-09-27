import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session'
import { Response } from './common/response.interceptor'
const post: number = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  // session
  app.use(session({
    secret: 'tang',
    name: "tang_session",
    cookie: {
      maxAge: 60 * 60 * 24
    }
  }))
  app.useGlobalInterceptors(new Response())

  await app.listen(post);
}
bootstrap();
