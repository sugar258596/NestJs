import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoginThrottlerMiddleware implements NestMiddleware {
  private count = 0;
  private blocked = false;
  private Max = 1000;
  private time = 2;

  use(req: Request, res: Response, next: NextFunction) {
    if (this.blocked)
      throw new HttpException('稍后再试!!', HttpStatus.TOO_MANY_REQUESTS);
    this.count++;
    if (this.count > this.Max) {
      this.blocked = true;
      setTimeout(() => {
        this.count = 0;
        this.blocked = false;
      }, this.time * 10000);
      throw new HttpException('稍后再试!!', HttpStatus.TOO_MANY_REQUESTS);
    }
    next();
  }
}
