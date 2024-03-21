import { Injectable } from '@nestjs/common';
import { CreateUserLikeDto } from './dto/create-user-like.dto';
import { UpdateUserLikeDto } from './dto/update-user-like.dto';

@Injectable()
export class UserLikeService {
  create(createUserLikeDto: CreateUserLikeDto) {
    return 'This action adds a new userLike';
  }

  findAll() {
    return `This action returns all userLike`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userLike`;
  }

  update(id: number, updateUserLikeDto: UpdateUserLikeDto) {
    return `This action updates a #${id} userLike`;
  }

  remove(id: number) {
    return `This action removes a #${id} userLike`;
  }
}
