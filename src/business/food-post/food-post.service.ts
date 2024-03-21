import { Injectable } from '@nestjs/common';
import { CreateFoodPostDto } from './dto/create-food-post.dto';
import { UpdateFoodPostDto } from './dto/update-food-post.dto';

@Injectable()
export class FoodPostService {
  create(createFoodPostDto: CreateFoodPostDto) {
    return 'This action adds a new foodPost';
  }

  findAll() {
    return `This action returns all foodPost`;
  }

  findOne(id: number) {
    return `This action returns a #${id} foodPost`;
  }

  update(id: number, updateFoodPostDto: UpdateFoodPostDto) {
    return `This action updates a #${id} foodPost`;
  }

  remove(id: number) {
    return `This action removes a #${id} foodPost`;
  }
}
