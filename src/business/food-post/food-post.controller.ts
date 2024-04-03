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
  Put,
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
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { MultipleImagesUploadDecorator } from 'src/decorator/upload.decorator';
import { authUser, getPagination } from 'src/decorator/auth.decorator';

@Controller('food-post')
@ApiTags('foodPost')
@ApiBearerAuth('access-token')
export class FoodPostController {
  constructor(private readonly foodPostService: FoodPostService) {}

  @Post('add')
  @ApiOperation({ summary: '发布美食' })
  @ApiConsumes('multipart/form-data')
  @ApiBody(FormData)
  @MultipleImagesUploadDecorator('/images/', 'files')
  create(
    @UploadedFiles() file: FileList,
    @Body() createFoodPostDto: CreateFoodPostDto,
    @authUser() User,
  ) {
    return this.foodPostService.create(file, createFoodPostDto, User);
  }

  @Get('get')
  @ApiOperation({ summary: '获取发布美食' })
  findAll(
    @authUser() User,
    @getPagination() SearchFoodPostDto: SearchFoodPostDto,
  ) {
    return this.foodPostService.findAll(User, SearchFoodPostDto);
  }

  @Get('role/get')
  @ApiOperation({ summary: '管理员获取发布美食' })
  RoleAll(@getPagination() SearchFoodPostDto: SearchFoodPostDto) {
    return this.foodPostService.RoleAll(SearchFoodPostDto);
  }

  @Get('one/:id')
  @ApiOperation({ summary: '获取美食详情' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.foodPostService.findOne(id);
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

  @Put('update/:id')
  @ApiOperation({
    summary: '管理员更新美食状态',
  })
  @ApiBody({ type: Number })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() type: { status: number },
  ) {
    return this.foodPostService.update(id, type);
  }
}
