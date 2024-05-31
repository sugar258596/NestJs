import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import {
  CreateReviewDto,
  GetReviewDto,
  GetSubReviewDto,
} from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

import { Review } from './entities/review.entity';
import { User } from '../user/entities/user.entity';

import { FoodPostService } from '../food-post/food-post.service';

@Injectable()
export class ReviewService {
  private readonly ITEMS_PER_PAGE = 3;
  constructor(
    @InjectRepository(Review) private readonly review: Repository<Review>,
    private readonly FoodPostService: FoodPostService,
  ) {}

  /**
   * @description 添加评论
   * @param {CreateReviewDto} createReviewDto 评论的参数
   * @param {number} createReviewDto.foodPostId 文章id
   * @param {string} createReviewDto.content 评论内容
   * @param {boolean} createReviewDto.isTop 是否为顶层评论
   * @param {number} createReviewDto.parentId 顶层评论id
   * @param {number} createReviewDto.foreignKey 父评论id
   * @param {string} createReviewDto.foreignName 父评论用户昵称
   * @param {User} user 用户信息
   * @returns
   */
  async addReview(createReviewDto: CreateReviewDto, user: User) {
    // const { foodPostId, parentId } = createReviewDto;
    const { id, parentId, foreignKey, foreignName, content } = createReviewDto;
    const review = new Review() as any;
    review.content = content;
    review.foreignKey = foreignKey;
    review.foreignName = foreignName;

    try {
      const { data } = await this.FoodPostService.findOne(user, id);
      review.foodPost = data;
      review.user = user;

      return await this.review.manager.transaction(async (manager) => {
        if (parentId) {
          const parentReview = await manager.findOne(Review, {
            where: { id: parentId },
          });
          review.isTop = false;
          review.parentId = parentId;
          parentReview.messageCount++;
          await manager.save(Review, parentReview);
        }
        await this.review.save(review);
        return { message: '评论成功,等待审核~' };
      });
    } catch (err) {
      throw new HttpException(
        err || '评论失败',
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * @description 获取评论
   * @param {GetReviewDto} getReviewDto 评论的参数
   * @param {number} getReviewDto.id 文章id
   * @param {number} getReviewDto.page 当前页数
   * @param {number} getReviewDto.pageSize 每页显示条数
   * @returns
   */
  async findReview(getReviewDto: GetReviewDto) {
    const { id, page, pageSize } = getReviewDto;

    try {
      const [topLevel, length] = await this.review
        .createQueryBuilder('review')
        .where('review.foodPostId = :id', { id })
        .andWhere({ isTop: true })
        .skip(page)
        .take(pageSize)
        .leftJoinAndSelect('review.user', 'user')
        .getManyAndCount();

      await Promise.all(
        topLevel.map(async (item: any) => {
          // 过滤用户信息
          item.user = this.filterUser(item.user);
          const subReview = await this.review
            .createQueryBuilder('review')
            .where('review.parentId = :id', { id: item.id })
            .leftJoinAndSelect('review.user', 'user')
            .take(this.ITEMS_PER_PAGE)
            .getMany();
          item.replies = subReview.map((sub) => {
            sub.user = this.filterUser(sub.user);
            return sub;
          });
        }),
      );

      return {
        data: {
          List: topLevel,
          length,
        },
        message: '获取评论成功',
      };
    } catch (err) {
      throw new HttpException(
        err || '获取评论失败',
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * @description 获取顶级评论，下面的子评论
   * @param {GetSubReviewDto} GetSubReviewDto 评论的参数
   * @param {number} GetSubReviewDto.id 评论id
   * @param {number} GetSubReviewDto.page 当前页数
   * @param {number} GetSubReviewDto.pageSize 每页显示条数
   * @returns
   */
  async findOneReview(GetSubReviewDto: GetSubReviewDto) {
    const { id, page, pageSize } = GetSubReviewDto;
    const dotPage = page + this.ITEMS_PER_PAGE;
    const dotPageSize = pageSize + this.ITEMS_PER_PAGE;

    const queryBuilder = this.review.createQueryBuilder('review');
    try {
      const [review, length] = await queryBuilder
        .where('review.parentId = :id', { id })
        .skip(dotPage)
        .take(dotPageSize)
        .leftJoinAndSelect('review.user', 'user')
        .getManyAndCount();

      review.map((item) => {
        item.user = this.filterUser(item.user);
      });

      return {
        data: {
          List: review,
          length,
        },
        message: '获取评论成功',
      };
    } catch (err) {
      throw new HttpException(
        err || '获取评论失败',
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * @description 删除评论
   * @param {number} id 评论id
   * @param {User} user 用户信息
   * @returns
   */
  async deleteReview(id: number, user: User) {
    try {
      //判断是否是自己的评论
      const { data } = await this.findOne(id);
      if (data.user.id !== user.id)
        throw new HttpException('无权限删除', HttpStatus.UNAUTHORIZED);
      return this.review.manager.transaction(async (manager) => {
        //删除当前评论
        await manager.delete(Review, { id });
        //删除子评论
        await manager.delete(Review, { parentId: id });
        return {
          message: '删除成功',
        };
      });
    } catch (err) {
      throw new HttpException(
        err || '删除失败',
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * @description 过滤用户信息
   * @param {User} user 用户信息
   * @returns {User} 返回过滤后的用户信息
   */
  private filterUser(user: User): User {
    const { id, username, Email, avatar, ...result } = user;
    return {
      id,
      username,
      Email,
      avatar,
    } as any;
  }

  /**
   * @description 获取评论详情
   * @param {number} id 评论id
   * @returns
   */
  async findOne(id: number) {
    try {
      const review = await this.review.findOne({
        where: { id },
        relations: ['user'],
      });
      if (!review) {
        throw new HttpException('评论不存在', HttpStatus.BAD_REQUEST);
      }
      return {
        data: review,
        message: '获取成功',
      };
    } catch (err) {
      throw new HttpException(
        err || '获取失败',
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
