import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Session,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import type { Response, Request } from 'express';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { authToken } from './auth.decorator';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @ApiOperation({ summary: '登录' })
  login(@Body() createAuthDto: CreateAuthDto, @Session() Session) {
    return this.authService.login(
      createAuthDto.username,
      createAuthDto.password,
      Session,
    );
  }

  @Post('register')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '注册' })
  register(
    @authToken('token') token,
    @Session() session,
    @Body() createAuthDto: CreateAuthDto,
  ) {
    return this.authService.register(session, token);
  }

  @Post('logOut')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: '退出' })
  logOut(@authToken('token') token, @Session() session, @Req() req: Request) {
    return this.authService.logOut(req, session, token);
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
