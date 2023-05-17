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
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
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

  @Get('/avaliable')
  findAvaliable(@Query() findManyParamsDto: FindManyParamsDto) {
    const { skip, take } = findManyParamsDto;
    return this.equipmentsService.findAvaliable(skip, take);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipmentsService.findById(id);
  }

  @Get('department/:id')
  findMany(
    @Param('id') id: number,
    @Query() findManyParams: FindManyParamsDto,
  ) {
    const { skip, take } = findManyParams;
    return this.equipmentsService.findByDepartmentId(id, skip, take);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEquipmentDto: UpdateEquipmentDto,
  ) {
    return this.equipmentsService.update(id, updateEquipmentDto);
  }
}
