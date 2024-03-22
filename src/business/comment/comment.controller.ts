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
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

import { authUser } from 'src/decorator/auth.decorator';

import { User } from '../user/entities/user.entity';

@Controller('comment')
@ApiTags('评论')
@ApiBearerAuth('access-token')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiOperation({ summary: '添加评论' })
  @ApiBody({ type: CreateCommentDto })
  create(@Body() createCommentDto: CreateCommentDto, @authUser() User: User) {
    return this.commentService.create(createCommentDto, User);
  }

  @Get()
  @ApiOperation({ summary: '根据发布的id查询下面所属的评论' })
  findAll(@Query('id', ParseIntPipe) id: number) {
    return this.commentService.findAll(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
