import { ApiProperty } from '@nestjs/swagger';
export class CreateAddressDto {
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

export class pagingDto {
  page: number;
  pagination: number;
}

export class SearchDto extends pagingDto {
  @ApiProperty({
    example: '糖',
    description: '可以通过昵称，电话号码，模糊地址查询',
    required: false,
  })
  name: string;

  @ApiProperty({
    example: 0,
    description: '页码',
    required: false,
  })
  page: number;
  @ApiProperty({
    example: 10,
    description: '页数',
    required: false,
  })
  pagination: number;
}
