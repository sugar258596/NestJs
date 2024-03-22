import { Module } from '@nestjs/common';
import { FoodPostService } from './food-post.service';
import { FoodPostController } from './food-post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FoodPost } from './entities/food-post.entity';
import { User } from '../user/entities/user.entity';

import { UploadService } from 'src/upload/upload.service';
import { ServerInfoService } from 'src/common/serverInfo.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([FoodPost, User])],
  controllers: [FoodPostController],
  providers: [FoodPostService, UploadService, ServerInfoService, UserService],
})
export class FoodPostModule {}
