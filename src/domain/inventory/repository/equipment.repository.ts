import { PaginationParams } from '@/core/repositories/pagination-params';
import { Equipment } from '../entity/equipment';

export interface IEquipmentRepository {
  findMany(params: PaginationParams): Promise<FindManyOutput>;
  findById(id: string): Promise<Equipment>;
  findByDepartmentId(
    departmentId: number,
    params: PaginationParams,
  ): Promise<FindManyOutput>;
  create(equipment: Equipment): Promise<void>;
  save(equipment: Equipment): Promise<void>;
}

export interface FindManyOutput {
  equipments: Equipment[];
  totalCount: number;
}
