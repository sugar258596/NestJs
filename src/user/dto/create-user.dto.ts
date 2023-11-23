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
  pagination: number;
}
