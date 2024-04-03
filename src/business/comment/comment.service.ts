import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCommentDto, SearchCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Comment } from './entities/comment.entity';
import { FoodPostService } from '../food-post/food-post.service';
import { ReplyService } from '../reply/reply.service';
import { Reply } from '../reply/entities/reply.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private readonly comment: Repository<Comment>,
    @InjectRepository(Reply) private readonly reply: Repository<Reply>,
    private readonly FoodPostService: FoodPostService, // private readonly ReplyService: ReplyService,
  ) {}

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
      throw new HttpException('评论失败', HttpStatus.NOT_FOUND);
    }
  }

  /**
   * @description 根据发布的id查询下面所属的评论
   * @param SearchCommentDto  - 查询评论信息
   * @param {number} SearchCommentDto.id - 美食分享id
   * @param {number} SearchCommentDto.page - 页码
   * @param {number} SearchCommentDto.pageSize - 每页数量
   * @returns
   */

  async findAll(SearchCommentDto: SearchCommentDto) {
    const { id, page, pageSize } = SearchCommentDto;

    try {
      const List = await this.comment.find({
        where: {
          foodPost: { id },
        },
        relations: ['user', 'replies'],
        skip: page,
        take: pageSize,
        order: { updatedAt: 'DESC' },
      });
      // 过滤掉user表中的敏感信息
      List.forEach((comment) => {
        const { id, username, avatar } = comment.user;
        comment.user = { id, username, avatar } as User;
      });
      // 处理回复列表中的用户信息
      await this.replyOneUser(List);

      return {
        data: { List },
        message: '查询成功',
      };
    } catch (err) {
      throw new HttpException(
        err || '查询失败',
        err.status || HttpStatus.NOT_FOUND,
      );
    }
  }

  /**
   * @description 删除评论
   * @param {number} id - 评论id
   * @returns
   */

  async remove(id: number) {
    try {
      const queryBuilder = this.comment.createQueryBuilder('comment');
      const { affected } = await queryBuilder
        .where('comment.id = :id', { id })
        .delete()
        .execute();
      if (!affected)
        throw new HttpException('未找到相应数据', HttpStatus.NOT_FOUND);
      return {
        data: { affected },
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
   * @description 根据评论id查询评论
   * @param {number} id 评论id
   * @returns
   */
  async findOne(id: number) {
    try {
      const comment = await this.comment.findOne({ where: { id } });
      if (!comment) {
        throw new HttpException('未找到相应数据', HttpStatus.NOT_FOUND);
      }
      return {
        data: comment,
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
   * @description
   * @param {any[]} arr
   */

  async replyOneUser(arr: any[]) {
    await Promise.all(
      arr.map(async (comment) => {
        await Promise.all(
          comment.replies.map(async (reply) => {
            try {
              const List = await this.reply.findOne({
                where: { id: reply.id },
                relations: ['user'],
              });
              if (!List) {
                throw new HttpException('未找到相应数据', HttpStatus.NOT_FOUND);
              }
              const { id, username, avatar } = List.user;
              reply.user = { id, username, avatar }; // 将回复的用户信息添加到回复对象中
            } catch (err) {
              throw new HttpException(
                err || '查询失败',
                err.status || HttpStatus.NOT_FOUND,
              );
            }
          }),
        );
      }),
    );
  }
}
