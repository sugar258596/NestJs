import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReplyDto, SearchCommentDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';

import { InjectRepository } from '@nestjs/typeorm';

import { Reply } from './entities/reply.entity';
import { User } from '../user/entities/user.entity';

import { CommentService } from '../comment/comment.service';
import { Repository } from 'typeorm';

@Injectable()
export class ReplyService {
  constructor(
    @InjectRepository(Reply) private readonly reply: Repository<Reply>,
    private readonly CommentService: CommentService,
  ) {}

  /**
   * @description 添加回复
   * @param createReplyDto  - 回复信息
   * @param {number} createReplyDto.id - 评论id
   * @param {string} createReplyDto.comment - 回复内容
   * @param {User} user - 用户信息
   * @returns
   */

  async create(createReplyDto: CreateReplyDto, user: User) {
    const { id, comment, type } = createReplyDto;
    try {
      const reple = new Reply();
      if (type === 0) {
        const { data } = await this.CommentService.findOne(id);
        reple.comments = data;
      } else {
        const parent = await this.reply.findOne({ where: { id } });
        if (!parent) throw new HttpException('回复失败', HttpStatus.NOT_FOUND);
        reple.parentReply = parent;
        reple.replies ? reple.replies.push(reple) : (reple.replies = [reple]);
      }
      reple.user = user;
      reple.comment = comment;
      await this.reply.save(reple);
      return { message: '回复成功' };
    } catch (err) {
      throw new HttpException(
        err || '回复失败',
        err.status || HttpStatus.NOT_FOUND,
      );
    }
  }

  /**
   * @description 回复的回复
   * @param SearchCommentDto - 查询评论信息
   * @param {number} SearchCommentDto.id - 评论id
   * @param {number} SearchCommentDto.page - 页码
   * @param {number} SearchCommentDto.pageSize - 每页数量
   * @returns
   */

  async findAll(SearchCommentDto: SearchCommentDto) {
    const { id, page, pageSize } = SearchCommentDto;
    const dotPage = page && page != 0 ? page : 0;
    const dotPageSize = pageSize ? dotPage * pageSize : 10;
    try {
      const List = await this.reply.find({
        where: { id },
        skip: dotPage,
        take: dotPageSize,
        relations: ['user', 'replies'],
        order: { updatedAt: 'DESC' },
      });
      // 处理评论列表中的用户信息
      List.forEach((comment) => {
        const { id, username, avatar } = comment.user;
        comment.user = { id, username, avatar } as User;
      });

      // 处理回复列表中的用户信息
      await Promise.all(
        List.map(async (comment) => {
          await Promise.all(
            comment.replies.map(async (reply) => {
              const replyDetails = await this.findOne(reply.id);
              reply.user = replyDetails.data.user; // 将回复的用户信息添加到回复对象中
            }),
          );
        }),
      );

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
   * @description 删除回复
   * @param {number} id 回复id
   * @returns
   */
  async remove(id: number) {
    try {
      const queryBuilder = this.reply.createQueryBuilder('comment');
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

  // 查询单个回复信息
  async findOne(replyId: number) {
    try {
      const List = await this.reply.findOne({
        where: { id: replyId },
        relations: ['user'],
      });
      const { id, username, avatar } = List.user;
      List.user = { id, username, avatar } as User;

      return {
        data: List,
        message: '查询成功',
      };
    } catch (err) {
      throw new HttpException(
        err || '查询失败',
        err.status || HttpStatus.NOT_FOUND,
      );
    }
  }
}
