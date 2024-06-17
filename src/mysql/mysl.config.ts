import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfigAsync = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  return {
    type: 'mysql', //数据库类型
    username: configService.get('DB_USERNAME'), //账号
    password: configService.get('DB_PASSWROD'), //密码
    host: configService.get('DB_URL'), //host
    port: configService.get('DB_PORT'), // 端口号
    database: configService.get('DB_DATABASE'), //库名
    // entities: [__dirname + '/**/*.entity{.ts,.js}'], //实体文件
    synchronize: true, //synchronize字段代表是否自动将实体类同步到数据库
    retryDelay: 500, //重试连接数据库间隔
    retryAttempts: 10, //重试连接数据库的次数
    autoLoadEntities: true,
  };
};
