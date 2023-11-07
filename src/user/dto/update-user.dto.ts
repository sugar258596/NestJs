import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import {IsNotEmpty,IsString,MinLength,MaxLength} from 'class-validator'
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @MinLength(2,{message:'不能少于2个字符'})
  @MaxLength(16,{message:'不能超过16个字符'})
  name: string;

  @IsNotEmpty({message:'密码不能为空'})
  @MinLength(6,{message:'不能少于6个字符'})
  @MaxLength(22,{message:'不能超过22个字符'})
  password: string;
}
