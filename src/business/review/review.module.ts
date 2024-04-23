import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';

import { FoodPostService } from '@/business/food-post/food-post.service';
import { UploadService } from '@/upload/upload.service';
import { ServerInfoService } from '@/common/serverInfo.service';
import { UserService } from '@/business/user/user.service';
import { FollowService } from '@/business/follow/follow.service';

import { FoodPost } from '@/business/food-post/entities/food-post.entity';
import { Follow } from '@/business/follow/entities/follow.entity';
import { User } from '@/business/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, FoodPost, User, Follow])],
  controllers: [ReviewController],
  providers: [
    ReviewService,
    FoodPostService,
    UploadService,
    ServerInfoService,
    UserService,
    FollowService,
  ],
})
export class ReviewModule {}
