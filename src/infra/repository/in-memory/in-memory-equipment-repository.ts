import { PaginationParams } from 'src/core/repositories/pagination-params';
import { Equipment } from '../../../domain/entity/equipment';
import {
  FindManyOutput,
  IEquipmentRepository,
} from '../../../domain/repository/equipment-repository';

export class InMemoryEquipmentRepository implements IEquipmentRepository {
  equipments: Equipment[] = [];

  async create(equipment: Equipment): Promise<void> {
    this.equipments.push(equipment);
  }

  async findMany(params: PaginationParams): Promise<FindManyOutput> {
    const equipments = this.equipments;
    const totalCount = equipments.length;
    return {
      equipments,
      totalCount,
    };
  }

  async findById(id: string): Promise<Equipment> {
    const equipment = this.equipments.find((equipment) => equipment.id === id);

    if (!equipment) {
      return null;
    }

    return Promise.resolve(equipment);
  }

  async save(equipment: Equipment): Promise<void> {
    const itemIndex = this.equipments.findIndex(
      (item) => item.id === equipment.id,
    );

    this.equipments[itemIndex] = equipment;
  }
}
