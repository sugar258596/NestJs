import { Controller, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { RatingService } from './rating.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { authUser } from 'src/decorator/auth.decorator';
import { User } from '../user/entities/user.entity';

@Controller('rating')
@ApiTags('评分')
@ApiBearerAuth('access-token')
export class RatingController {
  constructor(private readonly ratingService: RatingService) {}

  @Post()
  @ApiOperation({ summary: '用户评分' })
  create(@authUser() User: User, @Query() createRatingDto: CreateRatingDto) {
    return this.ratingService.create(User, createRatingDto);
  }
}
