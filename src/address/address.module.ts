import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressService } from './address.service';
import { UserService } from '../user/user.service';
import { AddressController } from './address.controller';
import { Address } from './entities/address.entity';
import { User } from '../user/entities/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Address, User])],
  controllers: [AddressController],
  providers: [AddressService, UserService],
})
export class AddressModule {}
