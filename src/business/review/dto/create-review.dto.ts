import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({ description: '文章id', required: true })
  id: number;
  @ApiProperty({ description: '评论内容', required: true })
  content: string;
  @ApiProperty({ description: '是否为顶层评论' })
  isTop: boolean;
  @ApiProperty({ description: '顶层评论id' })
  parentId: number;
  @ApiProperty({ description: '父评论id' })
  foreignKey: number;
  @ApiProperty({ description: '父评论用户昵称' })
  foreignName: string;
}

// 获取某个贴吧下面的评论
export class GetReviewDto {
  @ApiProperty({ description: '文章id', required: true })
  id: number;

  @ApiProperty({ description: '当前页数', example: 0 })
  page: number;

  @ApiProperty({ description: '每页显示条数', example: 10 })
  pageSize: number;
}

// 获取某个评论下面的子评论
export class GetSubReviewDto {
  @ApiProperty({ description: '评论id', required: true })
  id: number;

  @ApiProperty({ description: '当前页数', example: 0 })
  page: number;

  @ApiProperty({ description: '每页显示条数', example: 10 })
  pageSize: number;
}
