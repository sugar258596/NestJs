import { Test, TestingModule } from '@nestjs/testing';
import { FoodPostService } from './food-post.service';

describe('FoodPostService', () => {
  let service: FoodPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FoodPostService],
    }).compile();

    service = module.get<FoodPostService>(FoodPostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
