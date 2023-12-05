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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import type { Response, Request } from 'express';

import { AuthService } from './auth.service';
import { CreateAuthDto, RegisterDto } from './dto/create-auth.dto';
import { RegisteAuthDto } from './dto/update-auth.dto';
import { authToken, authUser } from '../decorator/auth.decorator';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Controller('auth')
@ApiTags('auth')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @ApiOperation({ summary: '登录' })
  login(
    @Body() createAuthDto: CreateAuthDto,
    @authUser() User,
    @Session() Session,
  ) {
    return this.authService.login(createAuthDto, User, Session);
  }

  @Post('register')
  @ApiOperation({ summary: '注册' })
  @ApiBody({ type: RegisterDto })
  register(@Body() createAuthDto: RegisteAuthDto) {
    return this.authService.register(createAuthDto);
  }

  @Post('logOut')
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
    console.log(session.code);
    res.set('Content-Type', 'image/svg+xml');
    res.send(captch.data);
  }

  @Get('userInfo')
  @ApiOperation({ summary: '获取用户信息' })
  userInfo(@authUser() User) {
    return this.authService.userInfo(User);
  }
}
