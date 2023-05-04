import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { FindAllEquipmentsOptionsDto } from './dto/find-all-equipments-options.dto';
import { UpdateEquipmentDeparmentDto } from './dto/update-equipment-department.dto';
import { EquipmentsService } from './equipments.service';

@ApiTags('Equipments')
@Controller('equipments')
export class EquipmentsController {
  constructor(private readonly equipmentsService: EquipmentsService) {}

  @Post()
  create(@Body() createEquipmentDto: CreateEquipmentDto) {
    return this.equipmentsService.create(createEquipmentDto);
  }

  @Get()
  findAll(@Query() findAllEquipmentsOptionsDto: FindAllEquipmentsOptionsDto) {
    const { skip, take } = findAllEquipmentsOptionsDto;
    return this.equipmentsService.findAll(take, skip);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipmentsService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEquipmentDeparmentDto: UpdateEquipmentDeparmentDto,
  ) {
    const { department } = updateEquipmentDeparmentDto;
    return this.equipmentsService.update(id, department);
  }
}
