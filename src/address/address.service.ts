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
   * @param {number} [id] - 传递的用户id（可选）
   * @returns
   */
  async create(createAddressDto: CreateAddressDto, id?: number) {
    const address = new Address();
    Object.keys(createAddressDto).forEach((e) => {
      address[e] = createAddressDto[e];
    });
    const { data } = await this.userService.findOne(id);
    address.user = data;
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
    const { page, pageSize } = pagingDto;
    try {
      const list = await this.Add.find({
        skip: page ? page : 0,
        take: pageSize ? pageSize : 10,
      });
      return {
        data: {
          list,
          length: list.length,
        },
        message: '查询成功',
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
   * @param {number} SearchDto.pageSize -页数
   * @returns
   */
  async find(SearchDto: SearchDto) {
    const { name, page, pageSize } = SearchDto;
    try {
      const queryBuilder = this.Add.createQueryBuilder();
      name
        ? queryBuilder.where([
            { addressName: ILike(`%${name}%`) },
            { address: ILike(`%${name}%`) },
            { phone: name },
          ])
        : queryBuilder.where('addressName IS NOT NULL');
      queryBuilder.skip(page ? page : 0).take(pageSize ? pageSize : 10);
      const [List, length] = await queryBuilder.getManyAndCount();
      return {
        data: { List, length },
        message: '查询成功',
      };
    } catch (err) {
      console.log(err);

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
        data: {
          length: affected,
        },
        message: '数据更新成功',
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
        data: {
          length: affected,
        },
        message: '数据删除成功',
      };
    } catch (err) {
      throw new HttpException(
        err.response || '数据删除失败',
        err.status || HttpStatus.BAD_REQUEST,
      );
    }
  }
}
