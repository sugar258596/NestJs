import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty,IsString,MinLength,MaxLength} from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty({message:'昵称不能为空'})
  @IsString()

  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  name: string;

  @IsNotEmpty({message:'密码不能为空'})
  @IsString()
  @MinLength(6,{message:'不能少于6个字符'})
  @MaxLength(22,{message:'不能超过22个字符'})
  @ApiProperty({ example: 'password123', description: 'The password of the user' })
  password: string;
}
