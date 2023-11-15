import { ApiProperty } from '@nestjs/swagger';
export class CreateAddressDto {
  @ApiProperty({
    example: 1,
    description: '用户ID',
  })
  userId: number;

  @ApiProperty({
    example: '糖',
    description: '昵称',
  })
  addressName: string;

  @ApiProperty({
    example: '13336319520',
    description: '电话号码',
  })
  phone: string;

  @ApiProperty({
    example: '广东省佛山市顺德区XXXXXX',
    description: '地址',
  })
  address: string;

  @ApiProperty({
    example: `0`,
    description: '邮政编号',
    required: false,
  })
  PostalCode?: number;
}

export class SearchDto {
  @ApiProperty({
    example: '糖',
    description: '可以通过昵称，电话号码，模糊地址查询',
  })
  name: string;
}

export class pagingDto {
  page: number;
  pagination: number;
}
