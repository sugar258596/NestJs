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

  /**
   *
   * @param {CreateAddressDto} createAddressDto - 添加地址的信息
   * @param {string} createAddressDto.addressName - 昵称
   * @param {string} createAddressDto.phone - 电话号码
   * @param {string} createAddressDto.address - 地址
   * @param {number} createAddressDto.PostalCode - 邮政编号
   * @param {User} userInfo - 当前用户的信息
   * @param {number} [id] - 传递的用户id（可选）
   * @returns
   */
  async create(
    createAddressDto: CreateAddressDto,
    userInfo: User,
    id?: number,
  ) {
    const address = new Address();
    Object.keys(createAddressDto).forEach((e) => {
      address[e] = createAddressDto[e];
    });

    if (Object.keys(id).length > 0) {
      const { data } = await this.userService.findOne(id);
      address.user = data;
    } else {
      address.user = userInfo;
    }

    try {
      let data = await this.Add.save(address);
      return {
        data,
        message: '地址已添加成功',
      };
    } catch (err) {
      throw new HttpException('添加地址失败', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * 查询所有的地址
   * @param pagingDto
   * @returns
   */

  async findAll(pagingDto: pagingDto) {
    const { page, pagination } = pagingDto;
    try {
      const list = await this.Add.find({
        skip: page ? page : 0,
        take: pagination ? pagination : 10,
      });
      return {
        data: {
          list,
        },
        message: '查询成功',
        length: list.length,
      };
    } catch (err) {
      throw new HttpException('查询失败', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * 搜索地址
   * @param {SearchDto} SearchDto
   * @param {string} SearchDto.name - 昵称,电话号码,模糊地址
   * @param {number} SearchDto.page - 页码
   * @param {number} SearchDto.pagination -页数
   * @returns
   */
  async find(SearchDto: SearchDto) {
    const { name, page, pagination } = SearchDto;
    try {
      const [list, total] = await this.Add.createQueryBuilder()
        .where([
          { addressName: ILike(`%${name}%`) },
          { address: ILike(`%${name}%`) },
          { phone: name },
        ])
        .skip(page ? page : 0)
        .take(pagination ? pagination : 10)
        .getManyAndCount();

      return {
        data: {
          list,
        },
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
