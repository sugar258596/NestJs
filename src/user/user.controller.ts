import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, Query, Headers, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { Request, Response } from 'express'
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get('code')
  createCode(@Req() req, @Res() res: Response, @Session() session) {
    const captch = this.userService.getCode()
    session.code = captch.text
    res.type('image/svg+xml')
    res.send(captch.data)
  }
  @Post('create')
  createuser(@Body() Body, @Session() session) {
    if (session.code.toLocaleLowerCase() === Body.code.toLocaleLowerCase()) {
      return {
        code: 200,
        message: '验证成功'
      }
    } else {
      return {
        code: 401,
        message: '验证错误'
      }
    }

  }

  @Post('adduser')
  createAdd(@Body() Body) {
    return this.userService.addUser(Body)
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Query() req) {
    return this.userService.findAll();
  }

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
