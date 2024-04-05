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
import { UserFavorite } from 'src/business/user-favorite/entities/user-favorite.entity';
import { Comment } from 'src/business/comment/entities/comment.entity';
import { Static } from 'src/enum/SQL';
import { Rating } from 'src/business/rating/entities/rating.entity';

// 美食分享表
@Entity()
export class FoodPost {
  // 主键，自动生成
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    comment: '标题',
  })
  title: string;

  // 描述
  @Column({
    comment: '描述',
  })
  description: string;

  // 图片链接
  @Column({
    comment: '图片地址',
    length: 6000,
  })
  imageList: string;

  // 美食分享类型
  @Column({
    comment: '美食分享类型',
  })
  type: string;

  // 总评分
  @Column({
    comment: '总评分',
    default: 0,
  })
  totalRating: number;

  // 评分次数
  @Column({
    comment: '评分次数',
    default: 0,
  })
  ratingCount: number;

  // 评分平均值
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

  // 状态
  @Column({
    type: 'enum',
    comment: '状态',
    enum: Static,
    default: Static.err,
  })
  status: number;

  // 创建时间
  @CreateDateColumn()
  createdAt: Date;

  // 更新时间
  @UpdateDateColumn()
  updatedAt: Date;

  // 多对一关系：多个美食分享属于同一个用户
  @ManyToOne(() => User, (user) => user.foodPosts)
  user: User;

  // 一对多关系：一个美食分享可以有多个评论
  @OneToMany(() => Comment, (comment) => comment.foodPost)
  comments: Comment[];

  // 一对多关系：一个美食分享可以被多个用户收藏
  @OneToMany(() => UserFavorite, (favorite) => favorite.foodPost)
  favorites: UserFavorite[];

  // 一对多关系：一个美食分享可以有多个回复
  @OneToMany(() => Reply, (reply) => reply.comments)
  replies: Reply[];

  //一对多关系：一个美食分享可以有多个评分
  @OneToMany(() => Rating, (rating) => rating.foodPost)
  ratings: Rating[];
}
