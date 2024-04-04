import { ApiProperty } from '@nestjs/swagger';

export class CreateFoodPostDto {
  @ApiProperty({
    example: '标题',
    description: '标题',
  })
  title: string;

  @ApiProperty({
    example: '描述',
    description: '描述',
    required: false,
  })
  description: string;

  @ApiProperty({
    example: '类型',
    description: '类型(类型和类型之间使用[,]号隔开)',
    required: false,
  })
  type: string;

  @ApiProperty({
    example: '图片',
    description: '图片(图片和图片之间使用[,]号隔开)',
    required: false,
  })
  imageList: string;
}

export const FormData = {
  schema: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        description: '标题',
      },
      description: {
        type: 'string',
        description: '描述',
      },
      file: {
        type: 'string',
        format: 'binary',
        description: '图片',
      },
    },
    require: ['title'],
  },
};

// 搜索的dto
export class SearchFoodPostDto {
  @ApiProperty({
    example: '标题',
    description: '标题',
    required: false,
  })
  title: string;

  @ApiProperty({
    example: '蔬菜类',
    description: '类型',
    required: false,
  })
  type: string[];

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

// 类型的dto
export class TypeFoodPostDto {
  @ApiProperty({
    example: '类型',
    description: '类型',
    required: false,
  })
  type: string;

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
