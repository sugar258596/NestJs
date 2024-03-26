import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReplyService } from './reply.service';

import { CreateReplyDto, SearchCommentDto } from './dto/create-reply.dto';
import { UpdateReplyDto } from './dto/update-reply.dto';
import { authUser } from 'src/decorator/auth.decorator';

@Controller('reply')
@ApiTags('回复')
@ApiBearerAuth('access-token')
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @Post('add')
  @ApiOperation({ summary: '添加回复' })
  @ApiBody({ type: CreateReplyDto })
  create(@Body() createReplyDto: CreateReplyDto, @authUser() User) {
    return this.replyService.create(createReplyDto, User);
  }

  @Get('get')
  @ApiOperation({ summary: '回复的回复' })
  @ApiBody({ type: CreateReplyDto })
  findAll(@Query() SearchCommentDto: SearchCommentDto) {
    return this.replyService.findAll(SearchCommentDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: '删除回复' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.replyService.remove(id);
  }
}
