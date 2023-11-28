import { PartialType } from '@nestjs/swagger';
import { CreateAuthDto, RegisterDto } from './create-auth.dto';
import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsString,
  Matches,
} from 'class-validator';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
export class RegisteAuthDto extends PartialType(RegisterDto) {
  @IsString()
  @IsNotEmpty({ message: '用户名不能为空' })
  @MinLength(2, { message: '用户名不能少于2个字符' })
  @MaxLength(16, { message: '用户名不能超过16个字符' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  @MinLength(6, { message: '密码不能少于6个字符' })
  @MaxLength(22, { message: '密码不能超过22个字符' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  @MinLength(6, { message: '密码不能少于6个字符' })
  @MaxLength(22, { message: '密码不能超过22个字符' })
  SecondaryPassword: string;

  @Matches(/^(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*|\d{11})$/, {
    message: '请输入有效的邮箱或手机号码',
  })
  @IsNotEmpty({ message: '邮箱不能为空' })
  Email: string;
}
