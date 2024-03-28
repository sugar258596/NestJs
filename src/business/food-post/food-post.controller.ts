import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UploadedFiles,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { FoodPostService } from './food-post.service';
import {
  CreateFoodPostDto,
  FormData,
  SearchFoodPostDto,
} from './dto/create-food-post.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { MultipleImagesUploadDecorator } from 'src/decorator/upload.decorator';
import { authUser } from 'src/decorator/auth.decorator';

@Controller('food-post')
@ApiTags('foodPost')
@ApiBearerAuth('access-token')
export class FoodPostController {
  constructor(private readonly foodPostService: FoodPostService) {}

  @Post('add')
  @ApiOperation({ summary: '发布美食' })
  @ApiConsumes('multipart/form-data')
  @ApiBody(FormData)
  @MultipleImagesUploadDecorator('../images/', 'files')
  create(
    @UploadedFiles() file: FileList,
    @Body() createFoodPostDto: CreateFoodPostDto,
    @authUser() User,
  ) {
    return this.foodPostService.create(file, createFoodPostDto, User);
  }

  @Get('get')
  @ApiOperation({ summary: '获取发布美食' })
  findAll(@Query() SearchFoodPostDto: SearchFoodPostDto) {
    return this.foodPostService.findAll(SearchFoodPostDto);
  }

  @Post('/user')
  @ApiOperation({ summary: '获取用户发布的美食' })
  findUserAll(@authUser() User) {
    return this.foodPostService.findAllByUser(User);
  }

  @Delete('delete/:id')
  @ApiOperation({
    summary: '删除美食',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.foodPostService.remove(id);
  }
}
