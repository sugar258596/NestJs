import { Test, TestingModule } from '@nestjs/testing';
import { UserFavoriteService } from './user-favorite.service';

describe('UserFavoriteService', () => {
  let service: UserFavoriteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserFavoriteService],
    }).compile();

    service = module.get<UserFavoriteService>(UserFavoriteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
