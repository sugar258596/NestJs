import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Static } from '../../enum/SQL';
@Entity()
export class Address {
  @PrimaryGeneratedColumn({
    comment: 'id',
  })
  id?: number;
  @Column({
    comment: '地址信息',
  })
  address: string;
  @Column({
    comment: '地址昵称',
  })
  addressName: string;
  @Column({
    comment: '电话号码',
  })
  phone: number;
  @Column({
    comment: '邮政编码',
  })
  PostalCode?: number;
  @Column({
    comment: '用户ID',
  })
  @ManyToOne(() => User, (user) => user.id)
  userId: number;
  @Column({
    type: 'enum',
    enum: Static,
    default: Static.ok,
    comment: '状态',
  })
  static?: number;
}
