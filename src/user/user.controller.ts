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
  Query,
  Headers,
  Session,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { Request, Response } from 'express';
import { ApiTags, ApiResponse, ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('code')
  createCode(@Req() req, @Res() res: Response, @Session() session) {
    const captch = this.userService.getCode();
    session.code = captch.text;
    res.type('image/svg+xml');
    res.send(captch.data);
  }
  @Post('create')
  createuser(@Body() Body, @Session() session) {
    console.log('session.code', session.code);
    return this.userService.createuser(Body, session);
  }

  @Post('adduser')
  @ApiBody({ type: CreateUserDto })
  @ApiOperation({
    summary: '添加用户',
    description: '用于用户添加',
  })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'User not found' })
  createAdd(@Body() Body: UpdateUserDto) {
    return this.userService.addUser(Body);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Query() req) {
    return this.userService.findAll();
  }
  A;
  @Get(':id')
  findOne(@Param('id') id: string, @Headers() Header) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
