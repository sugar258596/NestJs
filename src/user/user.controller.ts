import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
  Session,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiBody,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { Response } from 'express';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('code')
  @ApiOperation({ summary: '验证码' })
  @ApiResponse({
    status: 200,
    description: 'Captcha image',
    content: {
      'image/svg+xml': { schema: { type: 'string', format: 'binary' } },
    },
  })
  createCode(@Req() req, @Res() res: Response, @Session() session) {
    const captch = this.userService.getCode();
    session.code = captch.text;
    console.log(captch.text);
    res.set('Content-Type', 'image/svg+xml');
    res.send(captch.data);
  }

  @Post('create')
  createuser(@Body() Body, @Session() session) {
    console.log('session.code', session.code);
    return this.userService.createuser(Body, session);
  }

  @Post('adduser')
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ summary: '添加用户', description: '用于用户添加' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: {
              type: 'string',
              description: 'Data returned by the API',
              default: '用户已添加成功',
            },
            message: {
              type: 'string',
              description: 'Message indicating the result of the operation',
              default: '成功',
            },
            code: {
              type: 'number',
              description: 'Status code of the response',
              default: 200,
            },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  createAdd(@Body() Body: UpdateUserDto) {
    return this.userService.addUser(Body);
  }

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ summary: '用户查找' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: '查询全部' })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'id查询' })
  @ApiParam({ name: 'id', type: Number, description: '用户id' }) // 定义查询参数
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ summary: '数据更新' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            data: {
              type: 'string',
              description: 'Data returned by the API',
              default: '数据修改成功',
            },
            message: {
              type: 'string',
              description: 'Message indicating the result of the operation',
              default: '数据修改成功',
            },
            code: {
              type: 'number',
              description: 'Status code of the response',
              default: 200,
            },
          },
        },
      },
    },
  })
  @ApiParam({ name: 'id', type: Number, description: '用户id' }) // 定义查询参数
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'id删除' })
  @ApiParam({ name: 'id', type: Number, description: '用户id' }) // 定义查询参数
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(+id);
  }
}
