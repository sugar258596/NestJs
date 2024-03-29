export class CreateUploadDto {}

export const CreateUploadDtoDoc = {
  description: '上传到本地服务器---单图片',
  schema: {
    type: 'object',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  },
};

export const CreateUploadDtoGithub = {
  description: '上传到GitHub图床',
  schema: {
    type: 'object',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  },
};

export const CreateUploadDtoMultiple = {
  description: '上传到本地服务器---多图片',
  schema: {
    type: 'object',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  },
};
