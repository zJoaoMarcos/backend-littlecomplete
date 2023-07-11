import { PaginationParams } from '@/core/repositories/pagination-params';
import { CreateEquipmentUseCase } from '@/domain/inventory/use-cases/create-equipment';
import { EditEquipmentUseCase } from '@/domain/inventory/use-cases/edit-equipment';
import { FetchAllEquipmentsUseCase } from '@/domain/inventory/use-cases/fetch-all-equipments';
import { FindEquipmentByIdUseCase } from '@/domain/inventory/use-cases/find-equipment-by-id';
import { UpdateEquipmentStatusUseCase } from '@/domain/inventory/use-cases/update-equipment-status';
import { Injectable } from '@nestjs/common';
import {
  ConflictException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { CreateEquipmentDto } from './dto/create-equipment.dto';
import { UpdateEquipmentDto } from './dto/update-equipment.dto';

@Injectable()
export class EquipmentsService {
  constructor(
    private createUseCase: CreateEquipmentUseCase,
    private findAllUseCase: FetchAllEquipmentsUseCase,
    private findByIdUseCase: FindEquipmentByIdUseCase,
    private updateDetailsUseCase: EditEquipmentUseCase,
    private updateStatusUseCase: UpdateEquipmentStatusUseCase,
  ) {}

  async create(createEquipmentDto: CreateEquipmentDto) {
    try {
      return this.createUseCase.execute(createEquipmentDto);
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }

  async findAll(params: PaginationParams) {
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
      const { equipment } = await this.findByIdUseCase.execute({ id });
      return equipment.props;
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async update(id: string, updateEquipmentDto: UpdateEquipmentDto) {
    try {
      const { equipment } = await this.updateDetailsUseCase.execute({
        id,
        ...updateEquipmentDto,
      });

      return equipment.props;
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }

  async updateStatus(id: string, status: string, createdBy: string) {
    try {
      const { equipment } = await this.updateStatusUseCase.execute({
        equipment_id: id,
        status,
        createdBy,
      });

      return equipment.props;
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }
}
