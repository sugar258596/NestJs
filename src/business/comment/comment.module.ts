import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';

import { User } from '../user/entities/user.entity';
import { FoodPost } from '../food-post/entities/food-post.entity';
import { Reply } from '../reply/entities/reply.entity';

import { FoodPostService } from '../food-post/food-post.service';
import { UserService } from '../user/user.service';
import { ServerInfoService } from 'src/common/serverInfo.service';
import { UploadService } from 'src/upload/upload.service';
import { FollowService } from '../follow/follow.service';
import { Follow } from '../follow/entities/follow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, FoodPost, Reply, Follow])],
  controllers: [CommentController],
  providers: [
    CommentService,
    FoodPostService,
    UserService,
    ServerInfoService,
    UploadService,
    FollowService,
  ],
})
export class CommentModule {}
