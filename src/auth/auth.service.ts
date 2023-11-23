import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import * as svgCaptcha from 'svg-captcha';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private JwtService: JwtService,
    @InjectRepository(User) private readonly user: Repository<User>,
  ) {}

  async login(CreateAuthDto: CreateAuthDto, Session) {
    const { username, passwrod, swxCode } = CreateAuthDto;
    // if (this.createuser(swxCode, Session)) {
    const user = await this.user
      .createQueryBuilder('user')
      .addSelect(['user.name', 'user.password'])
      .where('user.name = :name', { name: username })
      .getOne();
    if (user?.password !== passwrod)
      throw new UnauthorizedException('认证失败,密码错误');
    const data = {
      id: user.id,
      username: user.name,
      newData: user.newDate,
      upData: user.upDate,
    };
    return {
      data,
      access_token: await this.JwtService.signAsync(data),
      message: '登录成功',
    };

    // }
  }

  register() {}

  logOut() {}

  // 生成验证码图片
  Code(
    size: number = 4,
    noise: number = 4,
    fontSize: number = 50,
    width: number = 100,
    height: number = 48,
    bg: string = '#1f2437',
  ) {
    const options = {
      size: size, //验证码长度
      fontSize: fontSize, // 验证码文本的字体大小
      color: true,
      width: width,
      height: height,
      background: bg, //验证码图片的背景颜色
      noise: noise, //干扰线的数量
    };
    return svgCaptcha.create(options);
  }

  // 验证码验证
  createuser(code: string, Session) {
    if (!Session.code)
      throw new HttpException('请先获取验证码', HttpStatus.FORBIDDEN);
    if (Session.code.toLocaleLowerCase() !== code.toLocaleLowerCase())
      throw new HttpException('验证码错误', HttpStatus.BAD_REQUEST);
    return true;
  }
}
