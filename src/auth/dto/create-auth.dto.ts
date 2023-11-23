import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty({
    example: '',
    description: '用户昵称',
  })
  username: string;

  @ApiProperty({
    example: '',
    description: '密码',
  })
  passwrod: string;

  @ApiProperty({
    example: '',
    description: '验证码',
  })
  swxCode: string;
}
