import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, SearchUserDto, pagingDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdataPagingDto } from './dto/update-user.dto';

@Controller('user')
@ApiTags('user')
@ApiBearerAuth('access-token')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
  @ApiOperation({ summary: '用户查找' })
  @ApiResponse({ status: 404, description: 'User not found' })
  create(@Body() createUserDto: SearchUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiQuery({ type: UpdataPagingDto })
  @ApiOperation({ summary: '查询全部' })
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
              default: '[]',
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
  findAll(@Query() pagingDto: pagingDto) {
    return this.userService.findAll(pagingDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'id查询' })
  @ApiParam({ name: 'id', type: Number, description: '用户id' }) // 定义查询参数
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '数据更新' })
  @ApiBody({ type: CreateUserDto })
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
  @ApiResponse({ status: 404, description: 'User not found' })
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
  @ApiResponse({ status: 404, description: 'User not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(+id);
  }
}
