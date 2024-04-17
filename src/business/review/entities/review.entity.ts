import { PrimaryGeneratedColumn } from 'typeorm';

export class Review {
  @PrimaryGeneratedColumn({
    comment: 'id',
  })
  id: number;
}
