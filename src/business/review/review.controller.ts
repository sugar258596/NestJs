import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { ReviewService } from './review.service';
import {
  CreateReviewDto,
  GetReviewDto,
  GetSubReviewDto,
} from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

import { authUser, getPagination } from '@/decorator/auth.decorator';

@Controller('review')
@ApiTags('评论')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post('/add')
  @ApiBody({ type: CreateReviewDto })
  @ApiOperation({ summary: '添加评论' })
  create(@Body() createReviewDto: CreateReviewDto, @authUser() user) {
    return this.reviewService.addReview(createReviewDto, user);
  }

  @Get('/get')
  @ApiOperation({ summary: '获取评论' })
  @ApiQuery({ type: GetReviewDto })
  findReview(@getPagination() getReviewDto: GetReviewDto) {
    return this.reviewService.findReview(getReviewDto);
  }

  @ApiOperation({ summary: '获取顶级评论，下面的子评论' })
  @Get('/getReview')
  getReview(@getPagination() GetSubReviewDto: GetSubReviewDto) {
    return this.reviewService.findOneReview(GetSubReviewDto);
  }

  @ApiOperation({ summary: '删除评论' })
  @Delete('/delete/:id')
  delete(@Param('id', ParseIntPipe) id: number, @authUser() user) {
    return this.reviewService.deleteReview(id, user);
  }
}
