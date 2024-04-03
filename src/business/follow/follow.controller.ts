import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { FollowService } from './follow.service';
import { authUser } from 'src/decorator/auth.decorator';

import { CreateFollowDto } from './dto/create-follow.dto';
import { UpdateFollowDto } from './dto/update-follow.dto';

import { User } from '../user/entities/user.entity';

@Controller('follow')
@ApiTags('关注')
@ApiBearerAuth('access-token')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post()
  @ApiOperation({ summary: '关注用户' })
  create(@authUser() user: User, @Query() CreateFollowDto: CreateFollowDto) {
    return this.followService.create(user, CreateFollowDto);
  }
}
