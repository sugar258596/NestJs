import { Injectable } from '@nestjs/common';

import { Octokit } from '@octokit/rest';
import { extname } from 'path';
import fetch from 'node-fetch';

import { ServerInfoService } from '../common/serverInfo.service';

@Injectable()
export class UploadService {
  private octokit: Octokit;
  private owner = 'sugar258596';
  private repo = 'DrawingBed';
  private branch = 'main';
  constructor(private readonly serverInfoService: ServerInfoService) {
    this.octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
      request: { fetch: fetch },
    });
  }

  create(file: Express.Multer.File) {
    const { filename } = file;
    const localIP = this.serverInfoService.getLocalIP();
    const agreement = process.env.AGREEMENT;
    const prefix = process.env.FILE_PREFIX;
    const url = `${agreement}://${localIP}${prefix}/${filename}`;
    return {
      data: {
        url,
        filename,
      },
      message: '上传成功',
    };
  }

  async uploadToGitHub(file: Express.Multer.File) {
    const contentBase64 = file.buffer.toString('base64');
    const fileName = `${new Date().getTime() + extname(file.originalname)}`;
    const filePath = `image-nest/${fileName}`;
    try {
      const response = await this.octokit.repos.createOrUpdateFileContents({
        owner: this.owner,
        repo: this.repo,
        path: filePath,
        message: `Upload image ${fileName}`,
        content: contentBase64,
        branch: this.branch,
      });

      return {
        data: {
          url: response.data.content.download_url,
          fileName,
        },
        message: '上传成功',
      }; // 返回图片的 URL
    } catch (error) {
      console.log(error);

      // throw new Error('Error uploading to GitHub');
      return false;
    }
  }
}
