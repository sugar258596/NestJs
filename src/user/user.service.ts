import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as svgCaptcha from 'svg-captcha'

@Injectable()
export class UserService {
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
  getCode(size?: number, noise?: number, fontSize?: number, width?: number, height?: number, bg?: string) {
    const options = {
      size: size || 4, //验证码长度
      fontSize: fontSize || 50, // 验证码文本的字体大小
      color: true,
      width: width || 100,
      height: height || 48,
      background: bg || '#1f2437',//验证码图片的背景颜色
      noise: noise || 3,//干扰线的数量
    };
    return svgCaptcha.create(options);
  }

}
