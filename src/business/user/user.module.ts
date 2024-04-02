import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

import { UploadService } from 'src/upload/upload.service';
import { ServerInfoService } from 'src/common/serverInfo.service';

/**
 * 应用中间件模块 需要实现 NestModule
 */

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UploadService, ServerInfoService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(Veriofy).forRoutes('user');
  }
}
