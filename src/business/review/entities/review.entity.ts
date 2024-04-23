import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@/business/user/entities/user.entity';
import { FoodPost } from '@/business/food-post/entities/food-post.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn({
    comment: 'id',
  })
  id: number;

  @Column({
    comment: '评论内容',
  })
  content: string;

  @CreateDateColumn({
    type: 'timestamp',
    comment: '评论时间',
  })
  createdAt: Date;

  // 是否为顶层评论
  @Column({
    comment: '是否为顶层评论',
    default: true,
  })
  isTop: boolean;

  // 顶层评论id
  @Column({
    comment: '顶层评论id',
    nullable: true,
  })
  parentId: number;

  // 假如不是顶层评论，那么就必须要有父评论，存储父评论的id
  @Column({
    comment: '父评论id',
    nullable: true,
  })
  foreignKey: number;

  // 存储父评论的用户昵称
  @Column({
    comment: '父评论用户昵称',
    nullable: true,
  })
  foreignName: string;

  @Column({
    comment: '子评论数量',
    default: 0,
  })
  messageCount: number;

  @Column({
    comment: '点赞数',
    default: 0,
  })
  likeCount: number;

  //多对一关系：多个评论对应一个用户
  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  //多对一关系：多个评论对应帖子
  @ManyToOne(() => FoodPost, (foodPost) => foodPost.reviews)
  foodPost: FoodPost;
}
