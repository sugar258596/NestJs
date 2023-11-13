import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import type { Request, Response } from 'express';
/**
 *  异常处理器  @Catch 装饰器注释并实现  ExceptionFilter 接口的类。
 *
 *  负责捕获作为 HttpException 类实例的异常
 */

@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const request = ctx.getRequest<Request>();

    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const message =
      typeof exception.getResponse() == 'object'
        ? (exception.getResponse() as any).message.toString()
        : (exception.getResponse() as any);

    response.status(status).json({
      code: status,
      message,
      time: new Date(),
      path: request.url,
    });
  }
}
