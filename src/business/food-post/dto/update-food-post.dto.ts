import { PartialType } from '@nestjs/mapped-types';
import { CreateFoodPostDto } from './create-food-post.dto';

export class UpdateFoodPostDto extends PartialType(CreateFoodPostDto) {}
