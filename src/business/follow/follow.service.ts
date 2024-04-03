import { Injectable } from '@nestjs/common';
import { CreateFollowDto } from './dto/create-follow.dto';
import { UpdateFollowDto } from './dto/update-follow.dto';

@Injectable()
export class FollowService {
  create(CreateFollowDto: CreateFollowDto) {
    return 'This action adds a new userLike';
  }

  findAll() {
    return `This action returns all userLike`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userLike`;
  }

  update(id: number, updateUserLikeDto: UpdateFollowDto) {
    return `This action updates a #${id} userLike`;
  }

  remove(id: number) {
    return `This action removes a #${id} userLike`;
  }
}
