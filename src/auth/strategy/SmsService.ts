import { Injectable } from '@nestjs/common';
import QcloudSms from 'qcloudsms_js';
import { ShortMessage } from './jwt.constants';
@Injectable()
export class SmsService {
  private qcloudsms: any;

  constructor() {
    const appid = ShortMessage.appid; // 腾讯云短信服务的 AppID
    const secretId = ShortMessage.templateId; // 腾讯云 API 密钥的 SecretId
    const secretKey = ShortMessage.appkey; // 腾讯云 API 密钥的 SecretKey

    const qcloudsms = QcloudSms(appid, secretId, secretKey);
    this.qcloudsms = qcloudsms;
  }

  async sendSMS(phoneNumber: string, content: string) {
    const ssender = this.qcloudsms.SmsSingleSender();
    const params = [content, '', '']; // 短信参数，根据需要进行修改
    const result = await ssender.sendWithParam(
      '86', // 国家码，这里是中国的国家码
      phoneNumber,
      ShortMessage.smsSign, // 短信
      params,
      '',
      '',
      '',
    );
    return result;
  }
}
