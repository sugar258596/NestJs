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
import { FoodPost } from 'src/business/food-post/entities/food-post.entity';
import { Reply } from 'src/business/reply/entities/reply.entity';

// 评论表
@Entity()
export class Comment {
  // 主键，自动生成
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '内容',
  })
  content: string;

  // 创建时间
  @CreateDateColumn()
  createdAt: Date;

  // 更新时间
  @UpdateDateColumn()
  updatedAt: Date;

  // 多对一关系：多个评论属于同一个用户
  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  // 多对一关系：多个评论属于同一个美食分享
  @ManyToOne(() => FoodPost, (foodPost) => foodPost.comments)
  foodPost: FoodPost;

  // 一对多关系：一个评论可以有多个回复
  @OneToMany(() => Reply, (reply) => reply.comments)
  replies: Reply[];
}
