import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { UploadService } from './upload.service';
import { ImageUploadDecorator } from '../decorator/upload.decorator';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('single')
  @ImageUploadDecorator('/images')
  create(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.create(file);
  }

  @Post('drawing')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    return this.uploadService.uploadToGitHub(file);
  }
}
