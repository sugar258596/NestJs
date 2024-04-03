import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodPostDto } from './create-food-post.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFoodPostDto extends PartialType(CreateFoodPostDto) {
  @ApiProperty({
    example: '标题',
    description: '标题',
  })
  title: string;

  @ApiProperty({
    example: '描述',
    description: '描述',
    required: true,
  })
  description: string;

  @ApiProperty({
    example: '类型',
    description: '类型(类型和类型之间使用[,]号隔开)',
    required: true,
  })
  type: string;

  @ApiProperty({
    example: '图片',
    description: '图片(图片和图片之间使用[,]号隔开)',
    required: true,
  })
  imageList: string;

  @ApiProperty({
    example: '总评分',
    description: '总评分',
    required: false,
  })
  totalRating: number;

  @ApiProperty({
    example: '评分次数',
    description: '评分次数',
    required: true,
  })
  ratingCount: number;

  @ApiProperty({
    example: '评分平均值',
    description: '评分平均值',
    required: true,
  })
  ratingAverage: number;
}
