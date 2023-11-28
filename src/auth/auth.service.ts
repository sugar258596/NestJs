import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto, RegisterDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import * as svgCaptcha from 'svg-captcha';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { Request } from 'express';
import { User } from '../user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
  async login(createAuthDto: CreateAuthDto, userInfo: CreateUserDto, Session) {
    if (!this.createuser(createAuthDto.swxCode, Session)) return;
    if (createAuthDto.password !== userInfo.password)
      throw new UnauthorizedException('账号或者密码错误');
    const { password, ...data } = userInfo;
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
    console.log(Session.code);

    if (Session && !Session.code)
      throw new HttpException('请先获取验证码', HttpStatus.FORBIDDEN);
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
    data.password = password;
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
}
