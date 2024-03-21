import { DocumentBuilder } from '@nestjs/swagger';

export const sessionConfig = {
  secret: 'tang',
  name: 'tang_session',
  cookie: {
    maxAge: 60 * 60 * 24,
    httpOnly: true,
  },
};

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Cats example')
  .setDescription('The cats API description')
  .setVersion('1.0')
  .addBearerAuth(
    { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    'access-token',
  )
  .build();
