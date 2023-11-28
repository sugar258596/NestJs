import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty({
    example: 'admin',
    description: '用户昵称',
  })
  username: string;

  @ApiProperty({
    example: '123456',
    description: '密码',
  })
  password: string;

  @ApiProperty({
    example: '',
    description: '验证码',
  })
  swxCode: string;
}

export class RegisterDto {
  @ApiProperty({
    example: 'admin',
    description: '用户名',
  })
  username: string;

  @ApiProperty({
    example: '123456',
    description: '密码',
  })
  password: string;

  @ApiProperty({
    example: '123456',
    description: '第二次密码',
  })
  SecondaryPassword: string;

  @ApiProperty({
    example: '13336319520',
    description: '邮箱',
  })
  Email: string;
}
