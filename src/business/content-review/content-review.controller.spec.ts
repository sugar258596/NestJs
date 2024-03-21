import { Test, TestingModule } from '@nestjs/testing';
import { ContentReviewController } from './content-review.controller';
import { ContentReviewService } from './content-review.service';

describe('ContentReviewController', () => {
  let controller: ContentReviewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentReviewController],
      providers: [ContentReviewService],
    }).compile();

    controller = module.get<ContentReviewController>(ContentReviewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
