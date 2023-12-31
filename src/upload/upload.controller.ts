import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiTags,
  ApiOperation,
  ApiConsumes,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { UploadService } from './upload.service';
import { ImageUploadDecorator } from '../decorator/upload.decorator';

@Controller('upload')
@ApiTags('upload')
@ApiBearerAuth('access-token')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('single')
  @ApiOperation({ summary: '上传到本地服务器' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '上传到本地服务器',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ImageUploadDecorator('/images')
  create(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.create(file);
  }

  @Post('drawing')
  @ApiOperation({ summary: '上传到github图床' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: '上传到本地服务器',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    return this.uploadService.uploadToGitHub(file);
  }
}
