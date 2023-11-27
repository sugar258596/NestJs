import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { SearchUserDto, pagingDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly test: Repository<User>,
  ) {}

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
        { username: updateUserDto.username, password: updateUserDto.password },
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

  /**
   * 添加用户
   * @param {Object} createUserDto 用户信息对象
   * @param {string} createUserDto.name 用户名
   * @param {string} createUserDto.password 用户密码
   * @returns  {Promise<User>} 返回添加后的用户信息
   */
  async addUser(createUserDto: User) {
    const data = new User();
    data.username = createUserDto.username;
    data.password = createUserDto.password;
    const databaseQuery = await this.create(createUserDto);
    if (databaseQuery) {
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

  /**
   * 查找用户
   * @param {Object} SearchUserDto 用户信息对象
   * @param {Object} SearchUserDto.username 用户名
   * @returns {Promise<{ data, message }>} 返回添加后的用户信息
   */
  async create(SearchUserDto: SearchUserDto) {
    try {
      const user = await this.createSQL(SearchUserDto.username);
      const { password, ...data } = user;
      return {
        data,
        message: '查询成功',
      };
    } catch (err) {
      throw new HttpException('查询失败', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   *
   * @param username 用户名
   * @returns  {Promise<User>} 返回查询后的用户信息
   */
  async createSQL(username: string) {
    try {
      const user = await this.test
        .createQueryBuilder('user')
        .addSelect(['user.username', 'user.password'])
        .where('user.username = :name', { name: username })
        .getOne();
      return user;
    } catch (err) {
      throw new HttpException('查询失败', HttpStatus.BAD_REQUEST);
    }
  }
}
