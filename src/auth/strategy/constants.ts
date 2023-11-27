export const jwtConstants = {
  secret:
    'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
};

export const whitelist = ['login', 'code', 'register'];

export const swaggerOptions = {
  customSiteTitle: 'My Custom Title',
  customCss: '.swagger-ui .topbar { background-color: pink }', // 自定义CSS样式
  customfavIcon: '/path/to/your/favIcon', // 自定义图标
  swaggerOptions: {
    validatorUrl: null, // 禁用在线验证
    oauth: {
      clientId: 'your-client-id',
      clientSecret: null,
      realm: 'your-realm',
      appName: 'Swagger UI',
      scopeSeparator: ',',
      additionalQueryStringParams: {},
      useBasicAuthenticationWithAccessCodeGrant: false,
      enableJwtToken: true, // 启用JWT令牌
      tokenName: 'Authorization', // JWT令牌的键名
      tokenUrl: '/auth/token', // 获取JWT令牌的URL地址
      flow: 'password', // 指定OAuth2流程类型
      type: 'apiKey', // 指定API Key的类型
      in: 'header', // JWT令牌的位置
    },
  },
};
