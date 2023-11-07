import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'admin', description: '用户昵称' })
  name: string;

  @ApiProperty({ example: '123456', description: '用户密码' })
  password: string;
}
