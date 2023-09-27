import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Test } from '../test/entities/test.entity';
import { Veriofy } from 'src/veriofy';

/**
 * 应用中间件模块 需要实现 NestModule 
 */


@Module({
  imports: [TypeOrmModule.forFeature([Test])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Veriofy).forRoutes()

  }
}
