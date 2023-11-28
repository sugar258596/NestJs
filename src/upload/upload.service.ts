import { Injectable } from '@nestjs/common';

import { ServerInfoService } from '../common/serverInfo.service';

@Injectable()
export class UploadService {
  constructor(private readonly serverInfoService: ServerInfoService) {}

  create(file: Express.Multer.File) {
    const { filename } = file;
    const localIP = this.serverInfoService.getLocalIP();
    const agreement = process.env.AGREEMENT;
    const prefix = process.env.FILE_PREFIX;
    const url = `${agreement}://${localIP}${prefix}/${filename}`;
    console.log(file);

    return {
      data: {
        url,
        filename,
      },
      message: '上传成功',
    };
  }
}
