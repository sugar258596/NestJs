import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import {
  CreateAddressDto,
  SearchDto,
  pagingDto,
} from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address) private readonly Add: Repository<Address>,
    @InjectRepository(User) private readonly user: Repository<User>,
    private readonly userService: UserService,
  ) {}
  async create(createAddressDto: CreateAddressDto) {
    const { data } = await this.userService.findOne(createAddressDto.userId);
    const address = new Address();
    Object.keys(createAddressDto).forEach((e) => {
      address[e] = createAddressDto[e];
    });
    address.user = data;
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

  async findAll(pagingDto: pagingDto) {
    const { page, pagination } = pagingDto;
    try {
      const data = await this.Add.find({
        relations: ['addresses'],
        skip: page ? page : 0,
        take: pagination ? pagination : 10,
      });
      return {
        data,
        message: '查询成功',
        length: data.length,
      };
    } catch (err) {
      throw new HttpException('查询失败', HttpStatus.BAD_REQUEST);
    }
  }

  async find(SearchDto: SearchDto) {
    const data = await this.Add.find({
      where: [
        { addressName: ILike(`%${SearchDto.name}%`) },
        { address: ILike(`%${SearchDto.name}%`) },
        { phone: SearchDto.name },
      ],
    });

    return {
      data,
      message: '查询成功',
      length: data.length,
    };
  }

  update(id: number, updateAddressDto: UpdateAddressDto) {
    return `This action updates a #${id} address`;
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
