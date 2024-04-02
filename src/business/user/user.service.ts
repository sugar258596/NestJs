import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { SearchUserDto, pagingDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, Like } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UploadService } from 'src/upload/upload.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
    private readonly UploadService: UploadService,
  ) {}

  /**
   * 添加用户
   * @param {UpdateUserDto} createUserDto 用户信息对象
   * @param {string} createUserDto.name 用户名
   * @param {string} createUserDto.password 用户密码
   * @param {string} createUserDto.Email 用户密码
   * @returns  {Promise<User>} 返回添加后的用户信息
   */
  async addUser(createUserDto: UpdateUserDto) {
    const { username, password, Email } = createUserDto;
    const data = await this.user.findOne({
      where: {
        username: username,
      },
    });
    if (data) {
      throw new HttpException('用户已存在', HttpStatus.BAD_REQUEST);
    }
    const user = new User();
    user.username = username;
    user.password = password;
    user.Email = Email;
    return this.AddMethod(user, '用户添加');
  }

  /**
   * @description 查找用户
   * @param {SearchUserDto} SearchUserDto 用户信息对象
   * @param {string} SearchUserDto.username 用户名
   * @param {number} SearchUserDto.page 页码
   * @param {number} SearchUserDto.pageSize 条数
   * @returns {Promise<{ data, message }>} 返回添加后的用户信息
   */
  async create(SearchUserDto: SearchUserDto) {
    const { username, page, pageSize } = SearchUserDto;
    try {
      const queryBuilder = this.user.createQueryBuilder();
      username
        ? queryBuilder.where({
            username: Like(`%${username}%`),
          })
        : queryBuilder.where('user.username IS NOT NULL');

      queryBuilder.skip(page).take(pageSize);
      const [List, length] = await queryBuilder.getManyAndCount();
      return {
        data: { List, length },
        message: '查询成功',
      };
    } catch (err) {
      throw new HttpException('查询失败', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * @description 数据更新的方法
   * @param {number} id 用户id
   * @param {UpdateUserDto} updateUserDto 用户信息
   * @param {string} updateUserDto.name 用户信息
   * @param {string} updateUserDto.password 用户信息
   * @param {string} updateUserDto.Email 用户信息
   * @param {Express.Multer.File} file 用户头像
   * @returns
   */
  async update(id: number, updateUserDto: UpdateUserDto) {
    const { username, password, Email } = updateUserDto;
    try {
      // 假如都没有传值
      if (!username && !password && !Email)
        throw new HttpException('不能修改空数据', HttpStatus.NOT_FOUND);

      const user = await this.createMethod(username);

      if (user && user.id !== id)
        throw new HttpException('用户已存在', HttpStatus.FORBIDDEN);

      // 准备要更新的字段
      const updateFields = {};

      // 判断是否有用户名
      if (username) {
        updateFields['username'] = username;
      }

      // 判断是否有密码
      if (password) {
        updateFields['password'] = await bcrypt.hash(password, 10);
      }

      // 判断是否有邮箱
      if (Email) {
        updateFields['Email'] = Email;
      }

      const { affected } = await this.user.update({ id }, updateFields);

      if (affected == 0)
        throw new HttpException('未找到相应数据', HttpStatus.NOT_FOUND);
      return {
        data: {
          length: affected,
        },
        message: '数据修改成功',
      };
    } catch (err) {
      throw new HttpException(
        err.response || '数据修改失败',
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * @description - 更改头像的方法
   * @param {number} id - 用户id
   * @param {File} file - 文件
   */

  async updateAvatar(id: number, file: Express.Multer.File) {
    try {
      const { data } = this.UploadService.create(file);
      if (!data.url)
        throw new HttpException('上传失败', HttpStatus.BAD_REQUEST);
      const { affected } = await this.user.update({ id }, { avatar: data.url });
      if (affected == 0)
        throw new HttpException('未找到相应数据', HttpStatus.NOT_FOUND);
      return {
        data,
        message: '更改头像成功',
      };
    } catch (err) {
      throw new HttpException(
        err.response || '更改头像失败',
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * @description 删除用户的方法
   * @param {number} id 用户id
   * @returns
   */
  async remove(id: number) {
    try {
      const { affected } = await this.user.delete({ id });
      if (affected == 0)
        throw new HttpException('未找到相应数据', HttpStatus.NOT_FOUND);
      return {
        data: {
          length: affected,
        },
        message: '数据删除成功',
      };
    } catch (err) {
      throw new HttpException(
        err.response || '数据删除失败',
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * @description 数据库查询完整信息
   * @param {string} username 用户名
   * @returns  {Promise<User>} 返回查询后的用户信息
   */

  async createMethod(username: string) {
    try {
      const user = await this.user
        .createQueryBuilder('user')
        .addSelect(['user.username', 'user.password'])
        .where('user.username = :name', { name: username })
        .getOne();
      return user;
    } catch (err) {
      throw new HttpException('查询失败', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * @description  user表添加数据的方法
   * @param data 添加的数据
   * @param message 提示信息
   */

  async AddMethod(data: any, message?: string) {
    const { password } = data;
    try {
      data.password = await bcrypt.hash(password, 10);
      await this.user.save(data);
      return {
        message: message + '成功',
      };
    } catch {
      throw new HttpException(message + '失败', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * @description 根据id查询用户是否存在的方法
   * @param {number} id 用户id
   * @returns
   */

  async findOne(id: number) {
    try {
      const data = await this.user.findOne({ where: { id } });
      return {
        data,
        message: data ? '查询成功' : '暂无数据',
      };
    } catch (err) {
      throw new HttpException('查询失败', HttpStatus.BAD_REQUEST);
    }
  }
}
