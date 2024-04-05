import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Static, RoleEnum } from '../../../enum/SQL';

import { Reply } from 'src/business/reply/entities/reply.entity';
import { Comment } from 'src/business/comment/entities/comment.entity';
import { UserFavorite } from 'src/business/user-favorite/entities/user-favorite.entity';
import { Follow } from 'src/business/follow/entities/follow.entity';
import { FoodPost } from 'src/business/food-post/entities/food-post.entity';
import { Rating } from 'src/business/rating/entities/rating.entity';
// 定义实体类
/**
   *  通过 @Entity 来标记一个实体类
   *  
   *  @PrimaryGeneratedColumn 表示主列，可以实现自动递增
   * 
   *  @Cloumn 表示空间列  
   *  {
   *      type:"varchar", // 列类型
          name:"ipaaa", //数据库表中的列名
          nullable:true, //在数据库中使列NULL或NOT NULL。 默认情况下，列是nullable：false
          comment:"注释", // 数据库的列注释
          select:true,  // 定义在进行查询时是否默认隐藏此列。 设置为false时，列数据不会显示标准查询。 默认情况下，列是select：true
          default:"xxxx", // 添加数据库级列的 DEFAULT 值
          primary:false, // 将列标记为主列。 如果你使用 @PrimaryColumn，则相同
          update:true, // 指示列值是否由 "save" 操作更新。 如果为 false，则仅当你第一次插入对象时才能写入此值。 默认值为 true。
   *  }
   * 
   *  @CreateDateColumn 自动设置为实体的插入日期
   * 
   *  @UpdateDateColumn 每次调用实体管理器或存储库的 save 时，它都会自动设置为实体的更新时间
   */

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

  // 一对多关系：一个用户可以发表多个评论
  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  // 一对多关系：一个用户可以关注多个用户
  @OneToMany(() => Follow, (like) => like.following)
  following: Follow[];

  // 一对多关系：一个用户可以被多个用户关注
  @OneToMany(() => Follow, (like) => like.follower)
  followers: Follow[];

  // 一对多关系：一个用户可以收藏多个美食分享
  @OneToMany(() => UserFavorite, (favorite) => favorite.user)
  favorites: UserFavorite[];

  // 一对多关系：一个用户可以回复多个评论
  @OneToMany(() => Reply, (reply) => reply.user)
  replies: Reply[];

  // 一对多关系：一个用户可以有多个评分
  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Reply[];
}
