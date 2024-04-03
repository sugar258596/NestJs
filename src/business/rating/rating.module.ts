import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';

import { Rating } from './entities/rating.entity';
import { FoodPost } from '../food-post/entities/food-post.entity';
import { User } from '../user/entities/user.entity';

import { FoodPostService } from 'src/business/food-post/food-post.service';
import { UploadService } from 'src/upload/upload.service';
import { ServerInfoService } from 'src/common/serverInfo.service';
import { UserService } from '../user/user.service';
@Module({
  imports: [TypeOrmModule.forFeature([FoodPost, User, Rating])],
  controllers: [RatingController],
  providers: [
    RatingService,
    FoodPostService,
    UploadService,
    ServerInfoService,
    UserService,
  ],
})
export class RatingModule {}
