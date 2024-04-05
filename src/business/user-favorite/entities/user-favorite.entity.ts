import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

import { User } from 'src/business/user/entities/user.entity';
import { FoodPost } from 'src/business/food-post/entities/food-post.entity';

// 用户收藏表
@Entity()
export class UserFavorite {
  // 主键，自动生成
  @PrimaryGeneratedColumn({
    comment: 'id',
  })
  id: number;

  // 创建时间
  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建时间',
  })
  createdAt: Date;

  // 多对一关系：多个收藏属于同一个用户
  @ManyToOne(() => User, (user) => user.favorites)
  user: User;

  // 多对一关系：多个收藏属于同一个美食分享
  @ManyToOne(() => FoodPost, (foodPost) => foodPost.favorites)
  foodPost: FoodPost;
}
