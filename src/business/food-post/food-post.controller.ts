import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FoodPostService } from './food-post.service';
import { CreateFoodPostDto } from './dto/create-food-post.dto';
import { UpdateFoodPostDto } from './dto/update-food-post.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

// @ApiBearerAuth('access-token')
@Controller('food-post')
export class FoodPostController {
  constructor(private readonly foodPostService: FoodPostService) {}

  @Post()
  create(@Body() createFoodPostDto: CreateFoodPostDto) {
    return this.foodPostService.create(createFoodPostDto);
  }

  @Get()
  findAll() {
    return this.foodPostService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.foodPostService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFoodPostDto: UpdateFoodPostDto,
  ) {
    return this.foodPostService.update(+id, updateFoodPostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.foodPostService.remove(+id);
  }
}
