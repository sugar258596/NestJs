import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto, createCodeDto, pagingDto } from './create-user.dto';
import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsString,
  Matches,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  @MinLength(2, { message: '昵称不能少于2个字符' })
  @MaxLength(16, { message: '昵称不能超过16个字符' })
  username: string;

  @IsOptional()
  @IsString()
  @MinLength(6, { message: '密码不能少于6个字符' })
  @MaxLength(22, { message: '密码不能超过22个字符' })
  password: string;

  @IsOptional()
  @Matches(/^(\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*|\d{11})$/, {
    message: '请输入有效的邮箱或手机号码',
  })
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
  pageSize: number;
}

// 修改密码的参数
export class UpdataPasswordDto {
  @IsString()
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: '新密码不能为空' })
  newPassword: string;
}
