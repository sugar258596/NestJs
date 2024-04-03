import { ApiProperty } from '@nestjs/swagger';

export class CreateFollowDto {
  @ApiProperty({ description: '被关注者id' })
  followId: number;
}
