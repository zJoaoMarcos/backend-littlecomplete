import { Injectable } from '@nestjs/common';
import {
  ConflictException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { CreateEquipmentUseCase } from 'src/domain/use-cases/equipment/create-equipment';
import { EditEquipmentUseCase } from 'src/domain/use-cases/equipment/edit-equipment';
import { FetchAllEquipmentsUseCase } from 'src/domain/use-cases/equipment/fetch-all-equipments';
import { FetchByDepartmentIdUseCase } from 'src/domain/use-cases/equipment/fetch-by-department-id';
import { FindEquipmentByIdUseCase } from 'src/domain/use-cases/equipment/find-equipment-by-id';
import { UpdateStatusUseCase } from 'src/domain/use-cases/equipment/update-status';
import { FindManyParamsDto } from '../shared/find-many-params.dto';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';

@Injectable()
export class EquipmentsService {
  constructor(
    private createUseCase: CreateEquipmentUseCase,
    private findAllUseCase: FetchAllEquipmentsUseCase,
    private findByIdUseCase: FindEquipmentByIdUseCase,
    private findByDepartmentIdUseCase: FetchByDepartmentIdUseCase,
    private updateDetailsUseCase: EditEquipmentUseCase,
    private updateStatusUseCase: UpdateStatusUseCase,
  ) {}

  async create(createEquipmentDto: CreateEquipmentDto) {
    try {
      return this.createUseCase.execute(createEquipmentDto);
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }

  async findAll(params: FindManyParamsDto) {
    try {
      const { equipments, totalCount } = await this.findAllUseCase.execute({
        params,
      });
      return {
        totalCount,
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

  async findByDepartmentId(
    department_id: number,
    skip?: number,
    take?: number,
  ) {
    try {
      const { equipments, totalCount } =
        await this.findByDepartmentIdUseCase.execute({
          department_id,
          skip,
          take,
        });

      return {
        totalCount,
        equipments: equipments.map((equipment) => {
          return equipment.props;
        }),
      };
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async update(id: string, updateEquipmentDto: UpdateEquipmentDto) {
    try {
      return this.updateDetailsUseCase.execute({
        id,
        ...updateEquipmentDto,
      });
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }

  async updateStatus(id: string, status: string) {
    try {
      return this.updateStatusUseCase.execute({
        equipment_id: id,
        status,
      });
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }
}
