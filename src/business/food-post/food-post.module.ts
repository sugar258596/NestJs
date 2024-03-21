import { Module } from '@nestjs/common';
import { FoodPostService } from './food-post.service';
import { FoodPostController } from './food-post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FoodPost } from './entities/food-post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FoodPost])],
  controllers: [FoodPostController],
  providers: [FoodPostService],
})
export class FoodPostModule {}
