import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { User } from 'src/business/user/entities/user.entity';
import { FoodPost } from 'src/business/food-post/entities/food-post.entity';

@Entity()
@Unique(['user', 'foodPost'])
export class Rating {
  @PrimaryGeneratedColumn({
    comment: 'id',
  })
  id: number;

  @Column({
    type: 'float',
    comment: '评分值',
  })
  value: number;

  // // 评分用户
  @ManyToOne(() => User, (user) => user.ratings)
  user: User;

  // 被评分的美食
  @ManyToOne(() => FoodPost, (foodPost) => foodPost.ratings)
  foodPost: FoodPost;
}
