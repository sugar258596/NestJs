import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAddressDto, SearchDto, pagingDto } from './create-address.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAddressDto extends PartialType(CreateAddressDto) {}

export class UpdataPagingDto extends PartialType(pagingDto) {
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
  pageSize: number;
}

export class UpdateSearchDto extends PartialType(SearchDto) {
  @IsString()
  @IsNotEmpty({ message: '不能为空' })
  name?: string;
}
