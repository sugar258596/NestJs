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
  async create(createAddressDto: CreateAddressDto, id: number) {
    const { data } = await this.userService.findOne(id);
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
    const { name, page, pagination } = SearchDto;
    try {
      const [data, total] = await this.Add.createQueryBuilder()
        .where([
          { addressName: ILike(`%${name}%`) },
          { address: ILike(`%${name}%`) },
          { phone: name },
        ])
        .skip(page ? page : 0)
        .take(pagination ? pagination : 10)
        .getManyAndCount();

      return {
        data,
        message: '查询成功',
        length: total,
      };
    } catch (err) {
      throw new HttpException('查询失败', HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updateAddressDto: UpdateAddressDto) {
    const { addressName, phone, PostalCode, address } = updateAddressDto;
    try {
      const { affected } = await this.Add.update(
        { id },
        {
          addressName: addressName,
          phone: phone,
          PostalCode: PostalCode,
          address: address,
        },
      );
      if (affected == 0)
        throw new HttpException('未找到相应数据', HttpStatus.NOT_FOUND);
      return {
        message: '数据更新成功',
        length: affected,
      };
    } catch (err) {
      throw new HttpException(
        err.response || '数据更新失败',
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  async remove(id: number) {
    try {
      const { affected } = await this.Add.delete({ id });
      if (affected == 0)
        throw new HttpException('未找到相应数据', HttpStatus.NOT_FOUND);
      return {
        message: '数据删除成功',
        length: affected,
      };
    } catch (err) {
      throw new HttpException(
        err.response || '数据删除失败',
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
