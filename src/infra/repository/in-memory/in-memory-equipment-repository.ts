import { PaginationParams } from '@/core/repositories/pagination-params';
import { Equipment } from '@/domain/inventory/entity/equipment';
import {
  FindManyOutput,
  IEquipmentRepository,
} from '@/domain/inventory/repository/equipment.repository';

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

  async findAvaliable(params: PaginationParams): Promise<FindManyOutput> {
    const equipments = this.equipments.filter(
      (equipment) => equipment.status === 'stock',
    );
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

  async findByDepartmentId(
    departmentId: number,
    params: PaginationParams,
  ): Promise<FindManyOutput> {
    const equipments = this.equipments.filter(
      (equipment) => equipment.departmentId === departmentId,
    );
    const totalCount = equipments.length;

    return {
      equipments,
      totalCount,
    };
  }

  async save(equipment: Equipment): Promise<void> {
    const itemIndex = this.equipments.findIndex(
      (item) => item.id === equipment.id,
    );

    this.equipments[itemIndex] = equipment;
  }
}
