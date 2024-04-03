import { ApiProperty } from '@nestjs/swagger';

export class CreateRatingDto {
  @ApiProperty({ example: 1, description: '美食帖ID' })
  id: number;

  @ApiProperty({ example: 80, description: '评分值' })
  value: number;
}
