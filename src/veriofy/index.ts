import { Injectable, NestMiddleware } from '@nestjs/common';

import type { Request, Response, NextFunction } from 'express';
/**
 *  中间件 使用 @Injectable 进行装饰
 *
 *  需要实现 NestMiddleware这个类
 */

@Injectable()
export class Veriofy implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('req.headers.authorization', req.headers.authorization);

    next();
  }
}
