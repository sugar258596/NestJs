import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserFavoriteService } from './user-favorite.service';
import { CreateUserFavoriteDto } from './dto/create-user-favorite.dto';
import { UpdateUserFavoriteDto } from './dto/update-user-favorite.dto';

@Controller('user-favorite')
export class UserFavoriteController {
  constructor(private readonly userFavoriteService: UserFavoriteService) {}

  @Post()
  create(@Body() createUserFavoriteDto: CreateUserFavoriteDto) {
    return this.userFavoriteService.create(createUserFavoriteDto);
  }

  @Get()
  findAll() {
    return this.userFavoriteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userFavoriteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserFavoriteDto: UpdateUserFavoriteDto) {
    return this.userFavoriteService.update(+id, updateUserFavoriteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userFavoriteService.remove(+id);
  }
}
