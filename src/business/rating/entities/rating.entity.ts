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
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: number; // 评分值

  // // 评分用户
  @ManyToOne(() => User, (user) => user.ratings)
  user: User;

  // 被评分的美食
  @ManyToOne(() => FoodPost, (foodPost) => foodPost.ratings)
  foodPost: FoodPost;
}
