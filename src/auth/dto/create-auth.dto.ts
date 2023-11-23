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
  passwrod: string;

  @ApiProperty({
    example: '',
    description: '验证码',
  })
  swxCode: string;
}
