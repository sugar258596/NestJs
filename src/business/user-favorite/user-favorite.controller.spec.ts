import { Test, TestingModule } from '@nestjs/testing';
import { UserFavoriteController } from './user-favorite.controller';
import { UserFavoriteService } from './user-favorite.service';

describe('UserFavoriteController', () => {
  let controller: UserFavoriteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserFavoriteController],
      providers: [UserFavoriteService],
    }).compile();

    controller = module.get<UserFavoriteController>(UserFavoriteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
