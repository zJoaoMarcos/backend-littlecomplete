import { PaginationParams } from 'src/core/repositories/pagination-params';
import { Department } from '../../../domain/entity/department';
import {
  FindManyOutput,
  IDepartmentRepository,
} from '../../../domain/repository/department-repository';

export class InMemoryDepartmentRepository implements IDepartmentRepository {
  departments: Department[] = [];

  async create(department: Department): Promise<void> {
    this.departments.push(department);
  }

  async findMany(params: PaginationParams): Promise<FindManyOutput> {
    const departments = this.departments;
    const totalCount = departments.length;

    return {
      departments,
      totalCount,
    };
  }

  async findByName(name: string): Promise<Department> {
    const department = this.departments.find(
      (deparment) => deparment.name === name,
    );

    if (!department) {
      return null;
    }

    return Promise.resolve(department);
  }

  findById(departmentId: number): Promise<Department> {
    const department = this.departments.find(
      (deparment) => deparment.id === departmentId,
    );

    if (!department) {
      return null;
    }

    return Promise.resolve(department);
  }

  async save(department: Department): Promise<void> {
    const itemIndex = this.departments.findIndex(
      (item) => item.id === department.id,
    );

    this.departments[itemIndex] = department;
  }
}
