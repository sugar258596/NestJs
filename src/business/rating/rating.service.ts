import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { User } from '../user/entities/user.entity';

import { Rating } from './entities/rating.entity';

import { FoodPostService } from '../food-post/food-post.service';

@Injectable()
export class RatingService {
  constructor(
    @InjectRepository(Rating) private readonly rating: Repository<Rating>,
    private readonly foodPostService: FoodPostService,
  ) {}
  async create(user: User, createRatingDto: CreateRatingDto) {
    try {
      const { id, value } = createRatingDto;
      const { data } = await this.foodPostService.findOne(user, id);
      if (data.user.id === user.id) {
        throw new HttpException('不能给自己评分', HttpStatus.BAD_REQUEST);
      }
      const rating = new Rating();
      rating.value = value;
      rating.user = user;
      rating.foodPost = data;
      await this.rating.save(rating);
      data.ratingCount += 1;
      data.totalRating += Number(value);
      await this.foodPostService.updateFoodPost(id, data);

      return {
        message: '评分成功,等待审核',
      };
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        // 捕获唯一性约束错误
        throw new HttpException(
          '您已经对该美食分享进行过评分',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          err || '评分失败',
          err.status || HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}
