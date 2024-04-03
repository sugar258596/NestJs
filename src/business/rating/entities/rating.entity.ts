import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/business/user/entities/user.entity';
import { FoodPost } from 'src/business/food-post/entities/food-post.entity';

@Entity()
export class Rating {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: number; // 评分值

  @ManyToOne(() => User, (user) => user.ratings)
  user: User; // 评分用户

  @ManyToOne(() => FoodPost, (food) => food.ratings)
  foodPost: FoodPost; // 被评分的美食
}
