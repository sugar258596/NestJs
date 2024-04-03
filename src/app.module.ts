import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDatabaseConfigAsync } from './mysql/mysl.config';

import { UserModule } from './business/user/user.module';
import { FoodPostModule } from './business/food-post/food-post.module';
import { UserFavoriteModule } from './business/user-favorite/user-favorite.module';
import { FollowModule } from './business/follow/follow.module';
import { CommentModule } from './business/comment/comment.module';
import { ContentReviewModule } from './business/content-review/content-review.module';
import { ReplyModule } from './business/reply/reply.module';
import { RatingModule } from './business/rating/rating.module';

import { APP_INTERCEPTOR, APP_FILTER, APP_PIPE, APP_GUARD } from '@nestjs/core';
import { Response } from './common/response.interceptor';
import { HttpFilter } from './common/filter.exception';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';
import { UploadModule } from './upload/upload.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as fs from 'fs';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [loadConfig],
      isGlobal: true,
    }),
    AuthModule,
    UploadModule,
    UserModule,
    FoodPostModule,
    UserFavoriteModule,
    FollowModule,
    CommentModule,
    ContentReviewModule,
    ReplyModule,
    RatingModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        getDatabaseConfigAsync(configService),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      // 响应拦截器注册
      provide: APP_INTERCEPTOR,
      useClass: Response,
    },
    {
      //错误拦截器注册
      provide: APP_FILTER,
      useClass: HttpFilter,
    },
    {
      // 配置全局的验证管道
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      // 全局守卫
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}

function loadConfig() {
  // 默认配置
  const defaultConfig = parseEnvFile('.env');

  // 环境特定配置
  const environment = process.env.NODE_ENV;
  const environmentConfig = parseEnvFile(`.env.${environment}`);

  // 合并配置
  return { ...defaultConfig, ...environmentConfig };
}

function parseEnvFile(filePath: string): Record<string, any> {
  if (!fs.existsSync(filePath)) {
    return {};
  }
  const envConfig = fs.readFileSync(filePath).toString();
  const config = {};
  envConfig.split('\n').forEach((line) => {
    const [key, value] = line.split('=');
    if (key && value) {
      config[key.trim()] = value.trim();
    }
  });
  return config;
}
