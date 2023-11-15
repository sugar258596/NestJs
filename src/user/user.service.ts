import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto, pagingDto } from './dto/create-user.dto';
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
  async create(createUserDto: CreateUserDto) {
    try {
      const data = await this.test.find({
        where: { name: createUserDto.name },
      });
      return {
        data,
        message: '查询成功',
        length: data.length,
      };
    } catch (err) {
      throw new HttpException('查询失败', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(pagingDto: pagingDto) {
    const { page, pagination } = pagingDto;

    try {
      const data = await this.test.find({
        relations: ['addresses'],
        skip: page ? page : 0,
        take: pagination ? pagination : 10,
      });
      return {
        data,
        message: '查询成功',
        length: data.length,
      };
    } catch (err) {
      throw new HttpException('查询失败', HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number) {
    try {
      const data = await this.test.findOne({ where: { id } });
      if (data) {
        return {
          data,
          message: '查询成功',
        };
      } else {
        return {
          data,
          message: '没有数据',
        };
      }
    } catch (err) {
      throw new HttpException('查询失败', HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const { affected } = await this.test.update(
        { id },
        { name: updateUserDto.name, password: updateUserDto.password },
      );
      if (affected == 0)
        throw new HttpException('未找到相应数据', HttpStatus.NOT_FOUND);
      return {
        message: '数据修改成功',
        length: affected,
      };
    } catch (err) {
      throw new HttpException(
        err.response || '数据修改失败',
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number) {
    try {
      const { affected } = await this.test.delete({ id });
      if (affected == 0)
        throw new HttpException('未找到相应数据', HttpStatus.NOT_FOUND);
      return {
        message: '数据删除成功',
        length: affected,
      };
    } catch (err) {
      throw new HttpException(
        err.response || '数据删除失败',
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
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
    const databaseQuery = await this.create(createUserDto);
    if (databaseQuery.length) {
      throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
    }
    try {
      await this.test.save(data);
      return {
        data: [],
        message: '用户已添加成功',
      };
    } catch {
      throw new HttpException('添加用户失败', HttpStatus.BAD_REQUEST);
    }
  }
}
