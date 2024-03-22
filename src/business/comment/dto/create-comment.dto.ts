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
