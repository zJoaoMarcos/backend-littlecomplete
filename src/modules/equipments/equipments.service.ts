import { Injectable } from '@nestjs/common';
import {
  ConflictException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { CreateEquipmentUseCase } from 'src/core/use-cases/equipment/create-equipment';
import { FindAllEquipmentsUseCase } from 'src/core/use-cases/equipment/find-all-equipments';
import { CreateEquipmentDto } from './dto/create-equipment.dto';

@Injectable()
export class EquipmentsService {
  constructor(
    private createUseCase: CreateEquipmentUseCase,
    private findAllUseCase: FindAllEquipmentsUseCase,
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

  /* async findByName(id: string) {
    try {
      return this.findByNameUseCase.execute(id);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  } */

  /* async update(id: string, department: string) {
    try {
      return this.updateUseCase.execute({ id, department });
    } catch (err) {
      throw new ConflictException(err.message);
    }
  } */
}
