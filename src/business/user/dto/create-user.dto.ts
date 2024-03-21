import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'admin',
    description: '用户昵称',
    minLength: 2,
    maxLength: 16,
  })
  username: string;

  @ApiProperty({
    example: '123456',
    description: '用户密码',
    minLength: 2,
    maxLength: 22,
  })
  password: string;

  @ApiProperty({
    example: '123456',
    description: '邮箱',
    minLength: 2,
    maxLength: 22,
  })
  Email: string;
}

export class SearchUserDto {
  @ApiProperty({
    example: 'admin',
    description: '用户昵称可以进行模糊查询,为空代表查询全部',
    minLength: 2,
    maxLength: 16,
    required: false,
  })
  username: string;

  @ApiProperty({
    example: 0,
    description: '页码',
  })
  page: number;

  @ApiProperty({
    example: 10,
    description: '条数',
  })
  pageSize: number;
}

export class createCodeDto extends CreateUserDto {
  @ApiProperty({
    example: '',
    description: '验证码',
  })
  code: string;
}

export class pagingDto {
  page: number;
  pageSize: number;
}
