import { PaginationParams } from 'src/core/repositories/pagination-params';
import { Equipment } from '../entity/equipment';

export interface IEquipmentRepository {
  create(equipment: Equipment): Promise<Equipment>;
  findMany(params: PaginationParams): Promise<FindManyOutput>;
  findById(id: string): Promise<Equipment>;
  save(equipment: Equipment): Promise<void>;
}

export interface FindManyOutput {
  equipments: Equipment[];
  totalCount: number;
}
