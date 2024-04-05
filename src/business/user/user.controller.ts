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
import {
  UpdataPasswordDto,
  UpdataUserDto,
  UpdateUserDto,
} from './dto/update-user.dto';
import { ImageUploadDecorator } from 'src/decorator/upload.decorator';
import { authUser, getPagination } from 'src/decorator/auth.decorator';

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
  create(@getPagination() createUserDto: SearchUserDto) {
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
  @Post('avatar/:id')
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

  // 当前用户修改密码
  @Patch('password')
  @ApiOperation({ summary: '修改密码' })
  @ApiParam({ name: 'id', type: Number, description: '用户id' }) // 定义查询参数
  @ApiBody({ type: CreateUserDto })
  updatePassword(@authUser() user, @Body() updateUserDto: UpdataPasswordDto) {
    return this.userService.updatePassword(user, updateUserDto);
  }

  // 当前用户修改头像
  @Post('avatar')
  @ApiOperation({ summary: '当前用户修改头像' })
  @ImageUploadDecorator('/images/avatar', 'avatar')
  updateAvatarSelf(
    @authUser() user,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.updateAvatarUser(user, file);
  }

  // 修改用户信息
  @Patch('info')
  @ApiOperation({ summary: '修改用户信息' })
  @ApiBody({ type: UpdataUserDto })
  updateInfo(@authUser() user, @Body() updateUserDto: UpdataUserDto) {
    return this.userService.updateInfo(user, updateUserDto);
  }
}
