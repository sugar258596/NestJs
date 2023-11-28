import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { AddressService } from './address.service';
import {
  CreateAddressDto,
  SearchDto,
  pagingDto,
} from './dto/create-address.dto';
import { UpdateAddressDto, UpdataPagingDto } from './dto/update-address.dto';

import { authUser } from '../auth/auth.decorator';

@Controller('address')
@ApiTags('Address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @ApiOperation({ summary: '当前用户下添加地址' })
  @ApiQuery({ name: 'id', type: Number, description: '用户id' }) // 定义查询参数
  create(
    @Body() createAddressDto: CreateAddressDto,
    @authUser() User,
    @Query() id: number,
  ) {
    return this.addressService.create(createAddressDto, User, id);
  }

  @Get()
  @ApiOperation({ summary: '查询全部' })
  @ApiQuery({ type: UpdataPagingDto })
  findAll(@Query() pagingDto: pagingDto) {
    return this.addressService.findAll(pagingDto);
  }

  @Get('search')
  @ApiOperation({ summary: '地址查询' })
  findOne(@Query() SearchDto: SearchDto) {
    return this.addressService.find(SearchDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: '数据更新' })
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    return this.addressService.update(+id, updateAddressDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'id删除' })
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.addressService.remove(+id);
  }
}
