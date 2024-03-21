import { PartialType } from '@nestjs/mapped-types';
import { CreateUserLikeDto } from './create-user-like.dto';

export class UpdateUserLikeDto extends PartialType(CreateUserLikeDto) {}
