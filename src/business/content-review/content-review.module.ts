import { Module } from '@nestjs/common';
import { ContentReviewService } from './content-review.service';
import { ContentReviewController } from './content-review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContentReview } from './entities/content-review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContentReview])],
  controllers: [ContentReviewController],
  providers: [ContentReviewService],
})
export class ContentReviewModule {}
