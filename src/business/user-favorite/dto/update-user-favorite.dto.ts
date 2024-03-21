import { PartialType } from '@nestjs/mapped-types';
import { CreateUserFavoriteDto } from './create-user-favorite.dto';

export class UpdateUserFavoriteDto extends PartialType(CreateUserFavoriteDto) {}
