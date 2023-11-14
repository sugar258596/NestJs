import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';
@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address) private readonly Add: Repository<Address>,
  ) {}
  async create(createAddressDto: CreateAddressDto) {
    const address = new Address();
    Object.keys(createAddressDto).forEach((e) => {
      address[e] = createAddressDto[e];
    });
    try {
      await this.Add.save(address);
      return {
        data: [],
        message: '地址已添加成功',
      };
    } catch (err) {
      console.log(err);

      throw new HttpException('添加地址失败', HttpStatus.BAD_REQUEST);
    }
  }

  findAll() {
    return `This action returns all address`;
  }

  findOne(name: string) {
    return `This action returns a #${name} address`;
  }
  findPhone(phone: number) {
    return `This action returns a #${phone} address`;
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
