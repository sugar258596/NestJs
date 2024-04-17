import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Static, RoleEnum } from '../../../enum/SQL';

import { Follow } from 'src/business/follow/entities/follow.entity';
import { FoodPost } from 'src/business/food-post/entities/food-post.entity';
import { Rating } from 'src/business/rating/entities/rating.entity';
import { Review } from '@/business/review/entities/review.entity';

// 用户表
@Entity()
export class User {
  @PrimaryGeneratedColumn({
    comment: 'id',
  })
  id?: number;

  @Column({
    comment: '昵称',
  })
  username: string;

  @Column({
    select: false,
    comment: '密码',
  })
  password: string;

  @Column({
    comment: '电子邮箱',
  })
  Email: string;

  @Column({
    type: 'varchar',
    length: 6000,
    nullable: true,
    default: `https://raw.githubusercontent.com/sugar258596/DrawingBed/main/image-nest/1701848739017.png`, // 设置默认值
    comment: '头像',
  })
  avatar?: string;

  @CreateDateColumn({
    type: 'timestamp',
    comment: '创建时间',
  })
  newDate?: string;

  @UpdateDateColumn({
    comment: '数据更新',
  })
  upDate?: string;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: [RoleEnum.TEST],
    comment: '权限',
  })
  roles?: RoleEnum[];

  @Column({
    type: 'enum',
    enum: Static,
    default: Static.ok,
    comment: '状态',
  })
  static?: number;

  // 一对多关系：一个用户可以发布多个美食分享
  @OneToMany(() => FoodPost, (foodPost) => foodPost.user)
  foodPosts: FoodPost[];

  // 一对多关系：一个用户可以关注多个用户
  @OneToMany(() => Follow, (like) => like.following)
  following: Follow[];

  // 一对多关系：一个用户可以被多个用户关注
  @OneToMany(() => Follow, (like) => like.follower)
  followers: Follow[];

  // 一对多关系：一个用户可以有多个评分
  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Rating[];
}
