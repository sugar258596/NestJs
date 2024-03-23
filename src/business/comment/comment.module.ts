import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';

import { User } from '../user/entities/user.entity';
import { FoodPost } from '../food-post/entities/food-post.entity';
import { ContentReview } from '../content-review/entities/content-review.entity';

import { FoodPostService } from '../food-post/food-post.service';
import { UserService } from '../user/user.service';
import { ServerInfoService } from 'src/common/serverInfo.service';
import { UploadService } from 'src/upload/upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, FoodPost, ContentReview])],
  controllers: [CommentController],
  providers: [
    CommentService,
    FoodPostService,
    UserService,
    ServerInfoService,
    FoodPostService,
    UploadService,
  ],
})
export class CommentModule {}