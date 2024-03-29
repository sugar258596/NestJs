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
  UploadedFile,
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
import { CreateUserDto, SearchUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ImageUploadDecorator } from 'src/decorator/upload.decorator';

@Controller('user')
@ApiTags('user')
@ApiBearerAuth('access-token')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('add')
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({ summary: '添加用户' })
  createAdd(@Body() Body: UpdateUserDto) {
    return this.userService.addUser(Body);
  }

  @Get('get')
  @ApiOperation({ summary: '用户查找' })
  create(@Query() createUserDto: SearchUserDto) {
    return this.userService.create(createUserDto);
  }

  @Patch('patch/:id')
  @ApiOperation({ summary: '数据更新' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiParam({ name: 'id', type: Number, description: '用户id' }) // 定义查询参数
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(+id, updateUserDto);
  }

  // 更改头像
  @Patch('avatar/:id')
  @ApiOperation({ summary: '更改头像' })
  @ImageUploadDecorator('/images/avatar', 'avatar')
  updateAvatar(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.updateAvatar(id, file);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'id删除' })
  @ApiParam({ name: 'id', type: Number, description: '用户id' }) // 定义查询参数
  @ApiResponse({ status: 404, description: 'User not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(+id);
  }
}
