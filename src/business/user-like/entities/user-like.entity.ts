import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

import { User } from 'src/business/user/entities/user.entity';
import { FoodPost } from 'src/business/food-post/entities/food-post.entity';

// 用户点赞表
@Entity()
export class UserLike {
  // 主键，自动生成
  @PrimaryGeneratedColumn()
  id: number;

  // 创建时间
  @CreateDateColumn()
  createdAt: Date;

  // 多对一关系：多个点赞属于同一个用户
  @ManyToOne(() => User, (user) => user.likes)
  user: User;

  // 多对一关系：多个点赞属于同一个美食分享
  @ManyToOne(() => FoodPost, (foodPost) => foodPost.likes)
  foodPost: FoodPost;
}
