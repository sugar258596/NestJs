import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
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
    comment: '邮政编码',
  })
  PostalCode?: number;
  @Column({
    comment: '用户ID',
  })
  userId: number;
  @Column({
    type: 'enum',
    enum: Static,
    default: Static.ok,
    comment: '状态',
  })
  static?: number;
}
