import { Module ,ValidationPipe} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import MYSQl from './mysql/mysl.config';
import { UserModule } from './user/user.module';
import { APP_INTERCEPTOR, APP_FILTER} from '@nestjs/core';
import { Response } from './common/response.interceptor';
import { HttpFilter } from './common/filter';

@Module({
  imports: [TypeOrmModule.forRoot(MYSQl), UserModule],
  providers: [
    { // 响应拦截器注册
      provide: APP_INTERCEPTOR,
      useClass: Response,
    },
    { //错误拦截器注册
      provide: APP_FILTER,
      useClass: HttpFilter,
    },
  ],
})
export class AppModule {}
