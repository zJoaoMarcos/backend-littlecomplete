import { PaginationParams } from 'src/core/repositories/pagination-params';
import { Department } from '../entity/department';

export interface IDepartmentRepository {
  findMany(params: PaginationParams): Promise<FindManyOutput>;
  findByName(name: string): Promise<Department>;
  findById(id: number): Promise<Department>;
  create(department: Department): Promise<void>;
  save(department: Department): Promise<void>;
}

export type FindManyOutput = {
  departments: Department[];
  totalCount: number;
};
