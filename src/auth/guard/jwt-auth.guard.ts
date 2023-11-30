import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Response, Request } from 'express';
import { whitelist, Blacklist } from '../strategy/jwt.constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();
    // 假如请求为 GET 请求 / 请求地址在白名单中，不进行权限校验
    if (
      (req.method == 'GET' && this.isInBlacklist(req.url)) ||
      this.isInWhitelist(req.url)
    )
      return true;
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException('凭证已过期！！！');
    }
    return user;
  }

  private isInWhitelist(url: string): boolean {
    return whitelist.some((item) => url.includes(item));
  }

  private isInBlacklist(url: string): boolean {
    return !Blacklist.some((item) => url.includes(item));
  }
}
