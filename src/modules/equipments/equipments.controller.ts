import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';

@ApiTags('equipments')
@Controller('equipments')
export class EquipmentsController {
  /*  */

  @Post()
  create(@Body() createEquipmentDto: CreateEquipmentDto) {
    return;
  }

  @Get()
  findAll() {
    return;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEquipmentDto: UpdateEquipmentDto,
  ) {
    return;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return;
  }
}
