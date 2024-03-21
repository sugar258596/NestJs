import { Test, TestingModule } from '@nestjs/testing';
import { ContentReviewService } from './content-review.service';

describe('ContentReviewService', () => {
  let service: ContentReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentReviewService],
    }).compile();

    service = module.get<ContentReviewService>(ContentReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
