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
} from '@nestjs/swagger';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Controller('address')
@ApiTags('Address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @ApiOperation({ summary: '添加地址' })
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @Get()
  @ApiOperation({ summary: '查询全部' })
  findAll() {
    return this.addressService.findAll();
  }

  @Get()
  @ApiOperation({ summary: '使用name 进行查询' })
  findOne(@Query() name: string) {
    return this.addressService.findOne(name);
  }

  @Get('phone')
  @ApiOperation({ summary: '使用Phone进行查询' })
  findPhone(@Query() Phone: number) {
    return this.addressService.findPhone(Phone);
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
