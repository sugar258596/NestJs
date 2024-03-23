import { Module } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { ReplyController } from './reply.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Reply } from './entities/reply.entity';

import { User } from '../user/entities/user.entity';
import { Comment } from '../comment/entities/comment.entity';
import { ContentReview } from '../content-review/entities/content-review.entity';
import { FoodPost } from '../food-post/entities/food-post.entity';

import { CommentService } from '../comment/comment.service';
import { FoodPostService } from '../food-post/food-post.service';
import { UserService } from '../user/user.service';
import { ServerInfoService } from 'src/common/serverInfo.service';
import { UploadService } from 'src/upload/upload.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reply, User, Comment, ContentReview, FoodPost]),
  ],
  controllers: [ReplyController],
  providers: [
    ReplyService,
    CommentService,
    UploadService,
    UserService,
    ServerInfoService,
    FoodPostService,
  ],
})
export class ReplyModule {}