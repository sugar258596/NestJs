import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors } from '@nestjs/common';

import { diskStorage } from 'multer';
import { extname, join } from 'path';

/**
 * @description 上传本地配置
 * @param path - 上传路径
 * @param key - 参数
 * @returns
 */

export const ImageUploadDecorator = (path: string, key: string = 'file') => {
  const storage = diskStorage({
    destination: join(__dirname, path), // 上传路径地址
    filename: (_, file, callback) => {
      const fileName = `${new Date().getTime()}${extname(file.originalname)}`;
      return callback(null, fileName);
    },
  });

  return UseInterceptors(FileInterceptor(key, { storage }));
};
