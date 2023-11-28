import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto, createCodeDto, pagingDto } from './create-user.dto';
import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsString,
  IsEmail,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsNotEmpty({ message: '昵称不能为空' })
  @MinLength(2, { message: '昵称不能少于2个字符' })
  @MaxLength(16, { message: '昵称不能超过16个字符' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  @MinLength(6, { message: '密码不能少于6个字符' })
  @MaxLength(22, { message: '密码不能超过22个字符' })
  password: string;

  @Matches(/^(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*|\d{11})$/, {
    message: '请输入有效的邮箱或手机号码',
  })
  @IsNotEmpty({ message: '邮箱或手机号码不能为空' })
  Email: string;
}

export class UpdataCodeDto extends PartialType(createCodeDto) {
  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  code: string;
}

export class UpdataPagingDto extends PartialType(pagingDto) {
  @ApiProperty({
    example: 0,
    description: '页码',
    required: false,
  })
  page: number;
  @ApiProperty({
    example: 10,
    description: '页数',
    required: false,
  })
  pagination: number;
}
