import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

import { User } from 'src/business/user/entities/user.entity';
import { FoodPost } from 'src/business/food-post/entities/food-post.entity';

// 审核内容表
@Entity()
export class ContentReview {
  // 主键，自动生成
  @PrimaryGeneratedColumn()
  id: number;

  // 审核状态
  @Column()
  status: string;

  // 审核备注
  @Column()
  reviewNotes: string;

  // 创建时间
  @CreateDateColumn()
  createdAt: Date;

  // 更新时间
  @UpdateDateColumn()
  updatedAt: Date;

  // 多对一关系：一个审核内容属于一个管理员用户
  @ManyToOne(() => User, (user) => user.reviews)
  admin: User;

  // 多对一关系：一个审核内容属于一个美食分享
  @ManyToOne(() => FoodPost, (foodPost) => foodPost.reviews)
  foodPost: FoodPost;
}
