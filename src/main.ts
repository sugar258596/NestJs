import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session'

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


  await app.listen(post);
}
bootstrap();
