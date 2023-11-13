import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import MYSQl from './mysql/mysl.config';
import { UserModule } from './user/user.module';
import { APP_INTERCEPTOR, APP_FILTER, APP_PIPE } from '@nestjs/core';
import { Response } from './common/response.interceptor';
import { HttpFilter } from './common/filter.exception';

@Module({
  imports: [TypeOrmModule.forRoot(MYSQl), UserModule],
  providers: [
    {
      // 响应拦截器注册
      provide: APP_INTERCEPTOR,
      useClass: Response,
    },
    {
      //错误拦截器注册
      provide: APP_FILTER,
      useClass: HttpFilter,
    },
    {
      // 配置全局的验证管道
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
