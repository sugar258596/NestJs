import { PartialType } from '@nestjs/mapped-types';
import { CreateContentReviewDto } from './create-content-review.dto';

export class UpdateContentReviewDto extends PartialType(CreateContentReviewDto) {}
