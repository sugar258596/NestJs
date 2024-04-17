import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  AfterLoad,
} from 'typeorm';

import { User } from 'src/business/user/entities/user.entity';
import { Reply } from 'src/business/reply/entities/reply.entity';
import { Comment } from 'src/business/comment/entities/comment.entity';
import { Static } from 'src/enum/SQL';
import { Rating } from 'src/business/rating/entities/rating.entity';

// 美食分享表
@Entity()
export class FoodPost {
  // 主键，自动生成
  @PrimaryGeneratedColumn({
    comment: 'id',
  })
  id: number;

  @Column({
    comment: '标题',
  })
  title: string;

  @Column({
    comment: '描述',
  })
  description: string;

  @Column({
    comment: '图片地址',
    length: 6000,
  })
  imageList: string;

  @Column({
    comment: '美食分享类型',
  })
  type: string;

  @Column({
    comment: '总评分',
    default: 0,
  })
  totalRating: number;

  @Column({
    comment: '评分次数',
    default: 0,
  })
  ratingCount: number;

  @Column({
    comment: '评分平均值',
    default: 0,
  })
  ratingAverage: number;

  @AfterLoad()
  calculateAverageRating() {
    // 计算评分平均值
    this.ratingAverage =
      this.ratingCount > 0 ? this.totalRating / this.ratingCount : 0;
  }

  @Column({
    type: 'enum',
    comment: '状态',
    enum: Static,
    default: Static.err,
  })
  status: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // 多对一关系：多个美食分享属于同一个用户
  @ManyToOne(() => User, (user) => user.foodPosts)
  user: User;

  // 一对多关系：一个美食分享可以有多个评论
  @OneToMany(() => Comment, (comment) => comment.foodPost)
  comments: Comment[];

  // 一对多关系：一个美食分享可以有多个回复
  @OneToMany(() => Reply, (reply) => reply.comments)
  replies: Reply[];

  //一对多关系：一个美食分享可以有多个评分
  @OneToMany(() => Rating, (rating) => rating.foodPost)
  ratings: Rating[];
}
