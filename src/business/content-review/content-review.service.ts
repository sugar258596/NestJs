import { Injectable } from '@nestjs/common';
import { CreateContentReviewDto } from './dto/create-content-review.dto';
import { UpdateContentReviewDto } from './dto/update-content-review.dto';

@Injectable()
export class ContentReviewService {
  create(createContentReviewDto: CreateContentReviewDto) {
    return 'This action adds a new contentReview';
  }

  findAll() {
    return `This action returns all contentReview`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contentReview`;
  }

  update(id: number, updateContentReviewDto: UpdateContentReviewDto) {
    return `This action updates a #${id} contentReview`;
  }

  remove(id: number) {
    return `This action removes a #${id} contentReview`;
  }
}
