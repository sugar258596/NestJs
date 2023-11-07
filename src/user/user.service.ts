import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as svgCaptcha from 'svg-captcha';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly test: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  // 生成验证码图片
  getCode(
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
  // 验证
  createuser(Body, session) {
    if (!session.code) {
      throw new HttpException('请先获取验证码', HttpStatus.FORBIDDEN);
    }

    if (session.code.toLocaleLowerCase() === Body.code.toLocaleLowerCase()) {
      return {
        code: 200,
        message: '验证成功',
      };
    } else {
      throw new HttpException('验证失败', HttpStatus.BAD_REQUEST);
    }
  }

  // 添加用户
  async addUser(createUserDto: User) {
    const data = new User();
    data.name = createUserDto.name;
    data.password = createUserDto.password;
    try {
      this.test.save(data);
      return '用户已添加成功';
    } catch {
      throw new HttpException('添加用户失败', HttpStatus.BAD_REQUEST);
    }
  }
}
