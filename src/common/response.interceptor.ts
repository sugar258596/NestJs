import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 *  响应拦截器器是用 @Injectable 装饰器注释并实现 NestInterceptor 接口的类。
 *  NestInterceptor<T, R> 是一个通用接口，其中 T 表示 Observable<T>（支持响应流）的类型，R 是 Observable<R> 封装的值的类型。
 */

interface Data<T> {
  data: T;
}

@Injectable()
export class Response<T> implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Data<T>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse();
    console.log('response.statusCode', response.statusCode);

    return next.handle().pipe(
      map((data) => {
        return {
          data,
          message: '成功',
          code: 200,
        };
      }),
    );
  }
}
