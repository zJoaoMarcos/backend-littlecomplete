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
import { FindManyParamsDto } from '../shared/find-many-params.dto';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
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
  findAll(@Query() findManyParamsDto: FindManyParamsDto) {
    const { skip, take } = findManyParamsDto;
    return this.equipmentsService.findAll(skip, take);
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
