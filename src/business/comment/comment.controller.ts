import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CommentService } from './comment.service';
import { CreateCommentDto, SearchCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

import { authUser } from 'src/decorator/auth.decorator';

import { User } from '../user/entities/user.entity';

@Controller('comment')
@ApiTags('评论')
@ApiBearerAuth('access-token')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('add')
  @ApiOperation({ summary: '添加评论' })
  @ApiBody({ type: CreateCommentDto })
  create(@Body() createCommentDto: CreateCommentDto, @authUser() User: User) {
    return this.commentService.create(createCommentDto, User);
  }

  @Get('get')
  @ApiOperation({ summary: '根据发布的id查询下面所属的评论' })
  @ApiBody({ type: SearchCommentDto })
  findAll(@Query() SearchCommentDto: SearchCommentDto) {
    return this.commentService.findAll(SearchCommentDto);
  }

  @Delete('deleted/:id')
  @ApiOperation({ summary: '删除评论' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.commentService.remove(id);
  }
}
