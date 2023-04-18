import { Injectable } from '@nestjs/common';
import {
  ConflictException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { CreateEquipmentUseCase } from 'src/core/use-cases/equipment/create-equipment';
import { FindAllEquipmentsUseCase } from 'src/core/use-cases/equipment/find-all-equipments';
import { FindEquipmentByIdUseCase } from 'src/core/use-cases/equipment/find-equipment-by-id';
import { updateEquipmentDepartmentUseCase } from 'src/core/use-cases/equipment/update-equipment';
import { CreateEquipmentDto } from './dto/create-equipment.dto';

@Injectable()
export class EquipmentsService {
  constructor(
    private createUseCase: CreateEquipmentUseCase,
    private findAllUseCase: FindAllEquipmentsUseCase,
    private findByIdUseCase: FindEquipmentByIdUseCase,
    private updateDepartmentUseCase: updateEquipmentDepartmentUseCase,
  ) {}

  async create(createEquipmentDto: CreateEquipmentDto) {
    try {
      return this.createUseCase.execute(createEquipmentDto);
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }

  async findAll() {
    try {
      return this.findAllUseCase.execute();
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async findById(id: string) {
    try {
      return this.findByIdUseCase.execute(id);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async update(id: string, department: string) {
    try {
      return this.updateDepartmentUseCase.execute({ id, department });
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }
}
