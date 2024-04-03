import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateFollowDto } from './dto/create-follow.dto';
import { UpdateFollowDto } from './dto/update-follow.dto';

import { Follow } from './entities/follow.entity';
import { User } from '../user/entities/user.entity';

import { UserService } from '../user/user.service';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow) private readonly follow: Repository<Follow>,
    private readonly userService: UserService,
  ) {}
  async create(user: User, CreateFollowDto: CreateFollowDto) {
    try {
      const { id } = user;
      const { followId } = CreateFollowDto;

      if (id === Number(followId))
        throw new HttpException('自己不能关注自己', HttpStatus.BAD_REQUEST);

      const { data } = await this.userService.findOne(+followId);
      if (!data) throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);

      const existing = await this.follow.findOne({
        where: {
          follower: { id },
          following: { id: followId },
        },
      });

      // 假如以前关注过 则取消关注
      if (existing) {
        await this.follow.remove(existing);
        return { message: '取消关注成功' };
      }
      const follow = new Follow();
      follow.follower = user;
      follow.following = data;
      await this.follow.save(follow);
      return { message: '关注成功' };
    } catch (err) {
      throw new HttpException(
        err.response || '关注失败',
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  // 获取用户关注列表
  async findAll(user: User) {
    try {
      const { id } = user;
      const list = await this.follow.find({
        where: {
          follower: { id },
        },
        relations: ['following'],
      });
      return { data: list };
    } catch (err) {
      throw new HttpException(
        err.response || '获取失败',
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
