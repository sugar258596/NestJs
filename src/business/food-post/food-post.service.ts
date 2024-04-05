import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Like, Repository, SelectQueryBuilder } from 'typeorm';

import {
  CreateFoodPostDto,
  SearchFoodPostDto,
} from './dto/create-food-post.dto';
import { UpdateFoodPostDto } from './dto/update-food-post.dto';
import { FoodPost } from './entities/food-post.entity';
import { User } from '../user/entities/user.entity';

import { UploadService } from 'src/upload/upload.service';
import { FollowService } from '../follow/follow.service';

@Injectable()
export class FoodPostService {
  constructor(
    @InjectRepository(FoodPost) private readonly foodPost: Repository<FoodPost>,
    private readonly UploadService: UploadService,
    private readonly followService: FollowService,
  ) {}

  /**
   * @description 美食发布的方法
   * @param {FileList} files - 上传文件
   * @param {object} createFoodPostDto - 创建美食的参数
   * @param {string} createFoodPostDto.title - 标题
   * @param {string[]} createFoodPostDto.type - 类型
   * @param {string} createFoodPostDto.description - 描述
   * @param {string} createFoodPostDto.imageList - 图片
   * @param {User} user - 用户
   * @returns
   */
  async create(
    files: FileList,
    createFoodPostDto: CreateFoodPostDto,
    user: User,
  ) {
    try {
      const foodPost = new FoodPost();
      const { data } = this.UploadService.multiple(files);
      createFoodPostDto.type = JSON.stringify(
        createFoodPostDto.type.split(','),
      );
      Object.assign(foodPost, createFoodPostDto);
      foodPost.user = user;
      foodPost.imageList = JSON.stringify(data);
      await this.foodPost.save(foodPost);

      return {
        message: '发布成功',
      };
    } catch (err) {
      throw new HttpException(
        err || '删除失败',
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * @description 查询美食分享
   * @param {object} SearchFoodPostDto  - 查询美食分享的参数
   * @param {string} SearchFoodPostDto.title - 标题
   * @param {number} SearchFoodPostDto.page - 页码
   * @param {number} SearchFoodPostDto.pageSize - 条数
   * @returns {Promise<{ data, message }> } 返回查询的美食分享
   */
  async findAll(user: User, SearchFoodPostDto: SearchFoodPostDto) {
    const { title, page, pageSize, type } = SearchFoodPostDto;
    const queryBuilder = this.foodPost.createQueryBuilder('foodPost');
    try {
      title || type
        ? queryBuilder
            .where((qb) => {
              if (title && type) {
                qb.where({
                  title: Like(`%${title}%`),
                }).orWhere({
                  type: Like(`%${type}%`),
                });
              } else if (title) {
                qb.where({ title: Like(`%${title}%`) });
              } else if (type) {
                qb.orWhere({ type: Like(`%${type}%`) });
              }
            })
            .andWhere({ status: 1 })
        : queryBuilder
            .where('foodPost.title IS NOT NULL')
            .andWhere({ status: 1 });

      queryBuilder
        .skip(page)
        .take(pageSize)
        .orderBy('foodPost.updatedAt', 'DESC')
        .orderBy('foodPost.ratingAverage', 'DESC')
        .leftJoinAndSelect('foodPost.user', 'user');
      const [List, length] = await queryBuilder.getManyAndCount();

      // 将查询到的图片地址转换为数组
      await Promise.all(
        List.map(async (item) => {
          item.imageList = JSON.parse(item.imageList);
          item.type = JSON.parse(item.type);
          const { id, avatar, username } = item.user;
          const isFollow = await this.followService.isFollow(user.id, id);
          item.user = { id, avatar, username, isFollow } as unknown as User;
        }),
      );

      return {
        data: { List, length },
        message: '查询成功',
      };
    } catch (err) {
      throw new HttpException('查询失败', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * @description 查询用户发布的美食分享
   * @param {User} user  - 用户
   * @returns
   */
  async findAllByUser(user: User) {
    try {
      const queryBuilder = this.foodPost.createQueryBuilder();
      queryBuilder
        .where({ user: user.id as any })
        .where({ status: 1 })
        .orderBy('updatedAt', 'DESC');
      const [List, length] = await queryBuilder.getManyAndCount();
      List.forEach((item) => {
        item.imageList = JSON.parse(item.imageList);
      });
      return {
        data: { List, length },
        message: '查询成功',
      };
    } catch (err) {
      throw new HttpException('查询失败', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * @description 删除美食分享
   * @param {number} id - 美食分享id
   * @returns
   */
  async remove(id: number) {
    const queryBuilder = this.foodPost.createQueryBuilder();
    try {
      queryBuilder.where('id = :id', { id });
      const { affected } = await queryBuilder.delete().execute();
      if (!affected)
        throw new HttpException('未找到相应数据', HttpStatus.NOT_FOUND);
      return {
        data: { length: affected },
        message: '删除成功',
      };
    } catch (err) {
      throw new HttpException(
        err || '删除失败',
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * @description  id查询美食分享
   * @param {number} id - 美食分享id
   * @returns
   */
  async findOne(user: User, Fid: number) {
    const queryBuilder = this.foodPost.createQueryBuilder('foodPost');
    try {
      queryBuilder
        .where({ id: Fid })
        .leftJoinAndSelect('foodPost.user', 'user');
      const foodPost = await queryBuilder.getOne();
      if (!foodPost)
        throw new HttpException('未找到相应数据', HttpStatus.NOT_FOUND);
      foodPost.imageList = JSON.parse(foodPost.imageList);
      foodPost.type = JSON.parse(foodPost.type);
      const { id, avatar, username } = foodPost.user;
      const isFollow = await this.followService.isFollow(user.id, id);
      foodPost.user = { id, avatar, username, isFollow } as unknown as User;
      return {
        data: foodPost,
        message: '查询成功',
      };
    } catch (err) {
      throw new HttpException(
        err || '查询失败',
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * @description 管理员查询全部美食
   * @param {object} SearchFoodPostDto  - 查询美食分享的参数
   * @param {string} SearchFoodPostDto.title - 标题
   * @param {number} SearchFoodPostDto.page - 页码
   * @param {number} SearchFoodPostDto.pageSize - 条数
   * @returns {Promise<{ data, message }> } 返回查询的美食分享
   */
  async RoleAll(SearchFoodPostDto: SearchFoodPostDto) {
    const { title, page, pageSize } = SearchFoodPostDto;
    const queryBuilder = this.foodPost.createQueryBuilder('foodPost');
    try {
      title
        ? queryBuilder.where({ title: Like(`%${title}%`) })
        : queryBuilder.where('foodPost.title IS NOT NULL');

      queryBuilder
        .skip(page)
        .take(pageSize)
        .orderBy('foodPost.updatedAt', 'DESC')
        .leftJoinAndSelect('foodPost.user', 'user');
      const [List, length] = await queryBuilder.getManyAndCount();

      // 将查询到的图片地址转换为数组
      List.forEach((item) => {
        item.imageList = JSON.parse(item.imageList);
        item.type = JSON.parse(item.type);

        const { id, avatar, username } = item.user;
        item.user = { id, avatar, username } as User;
      });

      return {
        data: { List, length },
        message: '查询成功',
      };
    } catch (err) {
      throw new HttpException('查询失败', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * @description 管理员更新美食状态·
   * @param {number} id - 美食id
   * @param {object} type - 更新状态
   * @param {number} type.status - 状态
   * @returns
   */

  async update(id: number, type: { status: number }) {
    const { status } = type;
    try {
      const { affected } = await this.foodPost.update({ id }, { status });
      if (!affected)
        throw new HttpException('未找到相应数据', HttpStatus.NOT_FOUND);
      return {
        data: { length: affected },
        message: '更新成功',
      };
    } catch (err) {
      throw new HttpException(
        err || '更新失败',
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * @description 更新美食分享
   * @param {number} id - 美食分享id
   * @param {UpdateFoodPostDto} updateFoodPostDto - 更新美食分享的参数
   * @returns
   */
  async updateFoodPost(id: number, updateFoodPostDto: UpdateFoodPostDto) {
    updateFoodPostDto.imageList = JSON.stringify(updateFoodPostDto.imageList);
    const { totalRating, ratingCount } = updateFoodPostDto;

    try {
      const { affected } = await this.foodPost.update(
        { id },
        { totalRating, ratingCount },
      );
      if (!affected)
        throw new HttpException('未找到相应数据', HttpStatus.NOT_FOUND);
      return {
        data: { length: affected },
        message: '更新成功',
      };
    } catch (err) {
      throw new HttpException(
        err || '更新失败',
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
