import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContentReviewService } from './content-review.service';
import { CreateContentReviewDto } from './dto/create-content-review.dto';
import { UpdateContentReviewDto } from './dto/update-content-review.dto';

@Controller('content-review')
export class ContentReviewController {
  constructor(private readonly contentReviewService: ContentReviewService) {}

  @Post()
  create(@Body() createContentReviewDto: CreateContentReviewDto) {
    return this.contentReviewService.create(createContentReviewDto);
  }

  @Get()
  findAll() {
    return this.contentReviewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentReviewService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContentReviewDto: UpdateContentReviewDto) {
    return this.contentReviewService.update(+id, updateContentReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentReviewService.remove(+id);
  }
}
