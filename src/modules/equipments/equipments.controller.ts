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
import { UpdateEquipmentStatusDto } from './dto/update-equipment-status.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { EquipmentsService } from './equipments.service';

@ApiTags('Inventory')
@Controller('inventory')
export class EquipmentsController {
  constructor(private readonly equipmentsService: EquipmentsService) {}

  @Post('equipment')
  create(@Body() createEquipmentDto: CreateEquipmentDto) {
    return this.equipmentsService.create(createEquipmentDto);
  }

  @Get('equipments')
  findAll(@Query() params: FindManyParamsDto) {
    return this.equipmentsService.findAll(params);
  }

  @Get('equipment/:id')
  findOne(@Param('id') id: string) {
    return this.equipmentsService.findById(id);
  }

  @Patch('equipment/:id')
  update(
    @Param('id') id: string,
    @Body() updateEquipmentDto: UpdateEquipmentDto,
  ) {
    return this.equipmentsService.update(id, updateEquipmentDto);
  }

  @Patch('equipment/status/:id')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateEquipmentStatusDto) {
    const { status } = dto;
    return this.equipmentsService.updateStatus(id, status);
  }
}
