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
export class Follow {
  // 主键，自动生成
  @PrimaryGeneratedColumn()
  id: number;

  // 创建时间
  @CreateDateColumn()
  createdAt: Date;

  // 关注者
  @ManyToOne(() => User, (user) => user.following)
  follower: User;

  // 被关注者
  @ManyToOne(() => User, (user) => user.followers)
  following: User;
}
