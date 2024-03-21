import { Injectable } from '@nestjs/common';
import { CreateUserFavoriteDto } from './dto/create-user-favorite.dto';
import { UpdateUserFavoriteDto } from './dto/update-user-favorite.dto';

@Injectable()
export class UserFavoriteService {
  create(createUserFavoriteDto: CreateUserFavoriteDto) {
    return 'This action adds a new userFavorite';
  }

  findAll() {
    return `This action returns all userFavorite`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userFavorite`;
  }

  update(id: number, updateUserFavoriteDto: UpdateUserFavoriteDto) {
    return `This action updates a #${id} userFavorite`;
  }

  remove(id: number) {
    return `This action removes a #${id} userFavorite`;
  }
}
