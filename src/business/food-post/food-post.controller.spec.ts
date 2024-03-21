import { Test, TestingModule } from '@nestjs/testing';
import { FoodPostController } from './food-post.controller';
import { FoodPostService } from './food-post.service';

describe('FoodPostController', () => {
  let controller: FoodPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FoodPostController],
      providers: [FoodPostService],
    }).compile();

    controller = module.get<FoodPostController>(FoodPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
