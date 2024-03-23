import { ApiProperty } from '@nestjs/swagger';

export class CreateReplyDto {
  @ApiProperty({
    example: 1,
    description: '评论的id',
    required: true,
  })
  id: number;

  @ApiProperty({
    example: '回复内容',
    description: '回复内容',
    required: true,
  })
  comment: string;

  // 评论回复还是回复回复，0为评论回复，1为回复回复
  @ApiProperty({
    example: 0,
    description: '回复的类型,0为评论回复,1为回复回复',
    required: true,
  })
  type: number;
}

// 获取回复的参数
export class SearchCommentDto {
  @ApiProperty({
    example: 1,
    description: '回复的id',
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
