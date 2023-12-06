import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Static, Add } from '../../enum/SQL';
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
    length: 20,
  })
  phone: string;
  @Column({
    type: 'enum',
    enum: Add,
    default: Add.PostalCode,
    comment: '邮政编码',
  })
  PostalCode?: number;

  @Column({
    type: 'enum',
    enum: Static,
    default: Static.ok,
    comment: '状态',
  })
  static?: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
