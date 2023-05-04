import { Injectable } from '@nestjs/common';
import {
  ConflictException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { CreateEquipmentUseCase } from 'src/domain/use-cases/equipment/create-equipment';
import { FindAllEquipmentsUseCase } from 'src/domain/use-cases/equipment/find-all-equipments';
import { FindEquipmentByIdUseCase } from 'src/domain/use-cases/equipment/find-equipment-by-id';
import { updateEquipmentDepartmentUseCase } from 'src/domain/use-cases/equipment/update-equipment-department';
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
      const { equipment } = await this.createUseCase.execute(
        createEquipmentDto,
      );

      return {
        equipment: equipment.props,
      };
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }

  async findAll(take?: number, skip?: number) {
    try {
      const { equipments } = await this.findAllUseCase.execute(take, skip);

      return {
        equipments: equipments.map((equipment) => {
          return equipment.props;
        }),
      };
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async findById(id: string) {
    try {
      const { equipment } = await this.findByIdUseCase.execute(id);
      return {
        equipment: equipment.props,
      };
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async update(id: string, department: string) {
    try {
      return this.updateDepartmentUseCase.execute(id, department);
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }
}
