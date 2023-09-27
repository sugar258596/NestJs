import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Test } from '../test/entities/test.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Test])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
