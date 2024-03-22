import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';

import { Comment } from './entities/comment.entity';
import { FoodPostService } from '../food-post/food-post.service';

import { User } from '../user/entities/user.entity';

@Injectable()
export class CommentService {
  private queryBuilder: SelectQueryBuilder<Comment>;
  constructor(
    @InjectRepository(Comment) private readonly comment: Repository<Comment>,
    private readonly FoodPostService: FoodPostService,
  ) {
    this.queryBuilder = this.comment.createQueryBuilder('comment');
  }

  /**
   * @description 添加评论
   * @param createCommentDto - 评论信息
   * @param {number} createCommentDto.id - 美食分享id
   * @param {string} createCommentDto.content - 评论内容
   * @param {User} user - 用户信息
   * @returns
   */
  async create(createCommentDto: CreateCommentDto, user: User) {
    try {
      const { data } = await this.FoodPostService.findOne(createCommentDto.id);
      const comment = new Comment();
      comment.foodPost = data;
      comment.content = createCommentDto.content;
      comment.user = user;
      await this.comment.save(comment);
      return {
        message: '评论成功',
      };
    } catch (err) {
      console.log(err);

      throw new HttpException('评论失败', HttpStatus.NOT_FOUND);
    }
  }

  // 根据发布美食的id查询下面所属的评论
  async findAll(id: number) {
    const comments = await this.queryBuilder
      .leftJoinAndSelect('comment.foodPost', 'foodPost')
      .leftJoinAndSelect('comment.user', 'user')
      .where('comment.foodPostId = :id', { id })
      .getMany();

    console.log(comments);

    return `This action returns all comment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
