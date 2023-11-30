import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { ServerInfoService } from '../common/serverInfo.service';
@Module({
  controllers: [UploadController],
  providers: [UploadService, ServerInfoService],
  imports: [
    // MulterModule.register({
    //   storage: diskStorage({
    //     destination: join(__dirname, '../src/images/upload'), //上传路径地址
    //     filename: (_, file, callback) => {
    //       const fileName = `${
    //         new Date().getTime() + extname(file.originalname)
    //       }`;
    //       return callback(null, fileName);
    //     },
    //   }),
    // }),
  ],
})
export class UploadModule {}
