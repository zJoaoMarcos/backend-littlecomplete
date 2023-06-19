import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { PaginationParams } from '@/core/repositories/pagination-params';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { CreateUserAssignmentDto } from './dto/create-user-assignment.dto';
import { UpdateEquipmentStatusDto } from './dto/update-equipment-status.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';
import { EquipmentsAssignmentsService } from './equipments-assignments.service';
import { EquipmentsService } from './equipments.service';

@ApiTags('Inventory')
@Controller('equipments')
export class EquipmentsController {
  constructor(
    private readonly equipmentsService: EquipmentsService,
    private readonly equipmentAssignmentsService: EquipmentsAssignmentsService,
  ) {}

  @Post()
  create(@Body() createEquipmentDto: CreateEquipmentDto) {
    return this.equipmentsService.create(createEquipmentDto);
  }

  @Get()
  findAll(@Query() params: PaginationParams) {
    return this.equipmentsService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipmentsService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEquipmentDto: UpdateEquipmentDto,
  ) {
    return this.equipmentsService.update(id, updateEquipmentDto);
  }

  @Patch('status/:id')
  updateStatus(@Param('id') id: string, @Body() dto: UpdateEquipmentStatusDto) {
    const { status } = dto;
    return this.equipmentsService.updateStatus(id, status);
  }

  // assign equipments

  @Post('/assign')
  saveAssignment(@Body() createUserAssignmentDto: CreateUserAssignmentDto) {
    return this.equipmentAssignmentsService.create(createUserAssignmentDto);
  }

  @Delete('assign/:id')
  removeEquipmentAssignment(@Param('id') id: string) {
    return this.equipmentAssignmentsService.removeEquipmentAssignment(id);
  }

  @Delete('all-assignments/:id')
  removeAllEquipmentAssignments(@Param('id') id: string) {
    return this.equipmentAssignmentsService.removeAllUserAssignments(id);
  }
}
