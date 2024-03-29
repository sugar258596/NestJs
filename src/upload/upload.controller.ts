import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { UploadService } from './upload.service';
import {
  ImageUploadDecorator,
  MultipleImagesUploadDecorator,
} from '../decorator/upload.decorator';
import {
  CreateUploadDtoDoc,
  CreateUploadDtoGithub,
  CreateUploadDtoMultiple,
} from './dto/create-upload.dto';

@Controller('upload')
@ApiTags('upload')
@ApiBearerAuth('access-token')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('single')
  @ApiOperation({ summary: '上传到本地服务器' })
  @ApiConsumes('multipart/form-data')
  @ApiBody(CreateUploadDtoDoc)
  @ImageUploadDecorator('/images', 'file')
  create(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.create(file);
  }

  @Post('drawing')
  @ApiOperation({ summary: '上传到github图床' })
  @ApiConsumes('multipart/form-data')
  @ApiBody(CreateUploadDtoGithub)
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    return this.uploadService.uploadToGitHub(file);
  }

  @Post('multiple')
  @ApiOperation({ summary: '多图片上传' })
  @MultipleImagesUploadDecorator('/images/', 'files')
  @ApiBody(CreateUploadDtoMultiple)
  MultipleImagesUpload(@UploadedFiles() files: FileList) {
    return this.uploadService.multiple(files);
  }
}
