// jwt 加密信息
export const jwtConstants = {
  secret:
    'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
};

// 不需要验证的接口
export const whitelist = ['login', 'register', 'logOut'];

// 需要验证的 GET 接口
export const Blacklist = ['userInfo'];

export const ShortMessage = {
  appid: '1400187558', // 短信应用SDK
  appkey: 'dc9dc3391896235ddc2325685047edc7', // 短信应用SDK
  templateId: '285590', // 短信模板ID
  smsSign: '三人行摹课', // 签名
};
