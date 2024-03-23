import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    example: 1,
    description: '美食分享的id',
    required: true,
  })
  id: number;

  @ApiProperty({
    example: '评论内容',
    description: '评论内容',
    required: true,
  })
  content: string;
}

// 获取评论的参数
export class SearchCommentDto {
  @ApiProperty({
    example: 1,
    description: '美食分享的id',
    required: true,
  })
  id: number;

  @ApiProperty({
    example: 0,
    description: '页码',
    required: false,
  })
  page: number;

  @ApiProperty({
    example: 10,
    description: '条数',
    required: false,
  })
  pageSize: number;
}
