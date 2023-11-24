import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as svgCaptcha from 'svg-captcha';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { Request } from 'express';

@Injectable()
export class AuthService {
  private blacklistedTokens: Set<string> = new Set();
  constructor(
    private JwtService: JwtService,
    private readonly UserService: UserService,
  ) {}

  /**
   *
   * @param username 用户名
   * @param pass  用户密码
   * @param Session  Session信息
   * @returns {Promise{data,access_token,message}} 登录后的放回信息
   */
  async login(username: string, pass: string, Session?) {
    // if (!this.createuser(CreateAuthDto.swxCode, Session)) return;
    const user = await this.UserService.createSQL(username);
    if (user?.password !== pass)
      throw new UnauthorizedException('认证失败,密码错误');
    const { password, ...data } = user;
    return {
      data,
      access_token: await this.JwtService.signAsync(data),
      message: '登录成功',
    };
  }

  /**
   *  生成验证码图片
   * @param {number} size 验证码长度
   * @param {number}  noise 干扰线的数量
   * @param  {number} fontSize 验证码文本的字体大小
   * @param  {number} width
   * @param  {number} height
   * @param {string}  bg 验证码图片的背景颜色
   * @returns
   */

  Code(
    size: number = 4,
    noise: number = 4,
    fontSize: number = 50,
    width: number = 100,
    height: number = 48,
    bg: string = '#1f2437',
  ) {
    const options = {
      size: size,
      fontSize: fontSize,
      color: true,
      width: width,
      height: height,
      background: bg,
      noise: noise,
    };
    return svgCaptcha.create(options);
  }

  /**
   * 验证码验证
   * @param {string} code 验证码
   * @param  Session  Session信息
   * @returns {boolean}
   */

  createuser(code: string, Session) {
    if (!Session.code)
      throw new HttpException('请先获取验证码', HttpStatus.FORBIDDEN);
    if (Session.code.toLocaleLowerCase() !== code.toLocaleLowerCase())
      throw new HttpException('验证码错误', HttpStatus.BAD_REQUEST);
    return true;
  }

  async register(session, token: string) {
    if (
      session &&
      session.blacklistedTokens &&
      session.blacklistedTokens.includes(token)
    ) {
      throw new UnauthorizedException('已过期请重新登录');
    }
    try {
      const decodedToken = await this.JwtService.verify(token);
      return {
        message: decodedToken,
      };
    } catch (error) {
      throw new UnauthorizedException('已过期请重新登录');
    }
  }

  /**
   *
   */
  logOut(req: Request, session, token: string) {
    session.blacklistedTokens = [...(session.blacklistedTokens || []), token];
    return {
      message: '退出成功',
    };
  }
}
