import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import * as svgCaptcha from 'svg-captcha';
import { Request } from 'express';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateAuthDto, RegisterDto } from './dto/create-auth.dto';
import { User } from '../business/user/entities/user.entity';
import { UserService } from '../business/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    private JwtService: JwtService,
    private readonly UserService: UserService,
  ) {}

  /**
   * 登录
   * @param createAuthDto 输入的用户信息
   * @param userInfo 数据库查找到的用户信息
   * @param Session session
   * @returns
   */
  async login(createAuthDto: CreateAuthDto, userInfo: User, Session) {
    if (!this.createuser(createAuthDto.swxCode, Session)) return;
    const savedHashedPassword = await bcrypt.compare(
      createAuthDto.password,
      userInfo.password,
    );
    if (!savedHashedPassword)
      throw new UnauthorizedException('账号或者密码错误');
    const { password, ...data } = userInfo;
    return {
      data: {
        userId: data.id,
        token: await this.JwtService.signAsync(data),
      },
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
    noise: number = 3,
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
    if (Session && !Session.code)
      throw new HttpException('请先获取验证码', HttpStatus.BAD_REQUEST);
    if (Session.code.toLocaleLowerCase() !== code.toLocaleLowerCase())
      throw new HttpException('验证码错误', HttpStatus.BAD_REQUEST);
    return true;
  }

  async register(createAuthDto: RegisterDto) {
    const { username, password, SecondaryPassword, Email } = createAuthDto;
    const user = await this.UserService.createMethod(username);
    if (user) throw new HttpException('用户已存在', HttpStatus.FORBIDDEN);
    if (password !== SecondaryPassword)
      new HttpException('两次密码不一致', HttpStatus.FORBIDDEN);
    const data = new User();
    data.username = username;
    data.password = await bcrypt.hash(password, 10);
    data.Email = Email;
    return this.UserService.AddMethod(data, '注册');
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

  /**
   *  获取用户信息
   * @param user token，存储的用户信息
   */
  userInfo(user: User) {
    const { exp, iat, ...data } = user as any;
    return {
      data,
      message: '成功获取',
    };
  }
}
