import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';

import { ServerInfoService } from '../common/serverInfo.service';

@Module({
  controllers: [UploadController],
  providers: [UploadService, ServerInfoService],
})
export class UploadModule {}
