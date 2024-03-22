import {
  FileInterceptor,
  FilesInterceptor,
  MulterModule,
} from '@nestjs/platform-express';
import { UseInterceptors } from '@nestjs/common';

import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs';

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

/**
 * @description  多图片/视频上传配置
 * @param path - 上传路径
 * @param key - 参数
 * @param max -最大上传数
 * @returns
 */
export const MultipleImagesUploadDecorator = (
  path: string,
  key: string = 'files',
  max: number = 6,
) => {
  const storage = diskStorage({
    // 上传路径地址
    destination: async (req, file: Express.Multer.File, callback) => {
      const uploadFile = file.mimetype.startsWith('video/')
        ? 'videos'
        : 'images';
      const folderPath = join(__dirname, path, uploadFile);
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }
      return callback(null, folderPath);
    },
    filename: async (_, file, callback) => {
      const fileName = `${new Date().getTime() * 1e9}${extname(
        file.originalname,
      )}`;
      return callback(null, fileName);
    },
  });

  return UseInterceptors(FilesInterceptor(key, max, { storage }));
};
