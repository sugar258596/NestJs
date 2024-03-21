import {
  SetMetadata,
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';

export const Auth = (...args: string[]) => SetMetadata('auth', args);

export const authToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    const authorization = req.headers.authorization;
    if (!authorization)
      throw new HttpException('凭证错误', HttpStatus.INTERNAL_SERVER_ERROR);
    const token = authorization.split(' ')[1];
    return token;
  },
);

export const authUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<Request>();
    const user = req.user;
    if (!user)
      throw new HttpException('凭证错误', HttpStatus.INTERNAL_SERVER_ERROR);
    return user;
  },
);
