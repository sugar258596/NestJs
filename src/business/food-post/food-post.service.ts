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

@Injectable()
export class FoodPostService {
  private queryBuilder: SelectQueryBuilder<FoodPost>;
  constructor(
    @InjectRepository(FoodPost) private readonly foodPost: Repository<FoodPost>,
    private readonly UploadService: UploadService,
  ) {
    this.queryBuilder = this.foodPost.createQueryBuilder();
  }

  /**
   * @description 美食发布的方法
   * @param {FileList} files - 上传文件
   * @param {object} createFoodPostDto - 创建美食的参数
   * @param {string} createFoodPostDto.title - 标题
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

      Object.keys(createFoodPostDto).forEach((key) => {
        foodPost[key] = createFoodPostDto[key];
      });
      foodPost.user = user;
      foodPost.imageList = JSON.stringify(data);

      await this.foodPost.save(foodPost);

      return {
        message: '发布成功',
      };
    } catch (err) {
      throw new HttpException('发布失败', HttpStatus.BAD_REQUEST);
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
  async findAll(SearchFoodPostDto: SearchFoodPostDto) {
    const { title, page, pageSize } = SearchFoodPostDto;
    const dotPage = page && page != 0 ? page : 0;
    const dotPageSize = pageSize ? dotPage * pageSize : 10;
    try {
      title
        ? this.queryBuilder.where({ title: Like(`%${title}%`) })
        : this.queryBuilder.where('foodPost.title IS NOT NULL');

      this.queryBuilder
        .skip(dotPage)
        .take(dotPageSize)
        .orderBy('foodPost.updatedAt', 'DESC');
      const [list, length] = await this.queryBuilder.getManyAndCount();

      // 将查询到的图片地址转换为数组
      list.forEach((item) => {
        item.imageList = JSON.parse(item.imageList);
      });

      return {
        data: { list, length },
        message: '查询成功',
      };
    } catch (err) {
      console.log(err);

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
      this.queryBuilder
        .where({ user: user.id as any })
        .orderBy('updatedAt', 'DESC');
      const [List, length] = await this.queryBuilder.getManyAndCount();
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
    try {
      this.queryBuilder.where('id = :id', { id });
      const { affected } = await this.queryBuilder.delete().execute();
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
  async findOne(id: number) {
    try {
      this.queryBuilder.where('id = :id', { id });
      const foodPost = await this.queryBuilder.getOne();
      if (!foodPost)
        throw new HttpException('未找到相应数据', HttpStatus.NOT_FOUND);
      foodPost.imageList = JSON.parse(foodPost.imageList);
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
}
