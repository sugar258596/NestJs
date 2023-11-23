import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { swaggerOptions } from './strategy/constants';

const post: number = 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // session 配置
  app.use(
    session({
      secret: 'tang',
      name: 'tang_session',
      cookie: {
        maxAge: 60 * 60 * 24,
        httpOnly: true,
      },
    }),
  );

  // swagger 配置
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document);
  await app.listen(post);
}
bootstrap();
