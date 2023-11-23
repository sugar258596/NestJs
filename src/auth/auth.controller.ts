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
  Query,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import type { Response } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: '登录' })
  login(@Body() createAuthDto: CreateAuthDto, @Session() Session) {
    return this.authService.login(createAuthDto, Session);
  }

  @Post('register')
  @ApiOperation({ summary: '注册' })
  register(@Body() createAuthDto: CreateAuthDto) {
    return '';
  }

  @Post('logOut')
  @ApiOperation({ summary: '退出' })
  logOut(@Body() createAuthDto: CreateAuthDto) {
    return '';
  }

  @Get('code')
  @ApiOperation({ summary: '获取验证码' })
  @ApiResponse({
    status: 200,
    description: 'Captcha image',
    content: {
      'image/svg+xml': { schema: { type: 'string', format: 'binary' } },
    },
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  createCode(@Res() res: Response, @Session() session) {
    const captch = this.authService.Code();
    session.code = captch.text;
    res.set('Content-Type', 'image/svg+xml');
    res.send(captch.data);
  }
}
