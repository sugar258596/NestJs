import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { User } from 'src/business/user/entities/user.entity';
import { Comment } from 'src/business/comment/entities/comment.entity';

// 回复表
@Entity()
export class Reply {
  // 主键，自动生成
  @PrimaryGeneratedColumn({
    comment: 'id',
  })
  id: number;

  @Column({
    comment: '内容',
  })
  content: string;

  // 创建时间
  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建时间',
  })
  createdAt: Date;

  // 更新时间
  @UpdateDateColumn({
    type: 'timestamp',
    comment: '更新时间',
  })
  updatedAt: Date;

  // 多对一关系：回复的用户
  @ManyToOne(() => User, (user) => user.replies)
  user: User;

  // 多对一关系：回复所属的评论
  @ManyToOne(() => Comment, (comment) => comment.replies)
  comments: Comment;

  // 多对一关系：回复所属的回复（父级回复）
  @ManyToOne(() => Reply, (reply) => reply.replies)
  parentReply: Reply;

  // 一对多关系：一个回复可以有多个子回复（下级回复）
  @OneToMany(() => Reply, (reply) => reply.parentReply)
  replies: Reply[];
}
