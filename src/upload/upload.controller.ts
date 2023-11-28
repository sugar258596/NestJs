import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ServerInfoService } from '../common/serverInfo.service';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    private readonly serverInfoService: ServerInfoService,
  ) {}

  @Post('single')
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File) {
    const localIP = this.serverInfoService.getLocalIP();
    console.log(localIP);

    console.log(file);

    return this.uploadService.create(file);
  }
}
