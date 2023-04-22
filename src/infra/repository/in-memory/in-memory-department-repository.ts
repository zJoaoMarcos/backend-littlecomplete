import { Department } from '../../../domain/entity/department';
import { IDepartmentRepository } from '../../../domain/repository/department-repository';

export class InMemoryDepartmentRepository implements IDepartmentRepository {
  departments: Department[] = [];

  async create(
    name: string,
    cost_center: number,
    is_board: boolean,
    board: string,
  ): Promise<Department> {
    const department = Department.create({
      name,
      cost_center,
      is_board,
      board,
    });

    this.departments.push(department);

    return department;
  }

  async findAll(): Promise<Department[]> {
    return Promise.resolve(this.departments);
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

  async update(
    name: string,
    data: {
      name?: string;
      cost_center?: number;
      is_board?: boolean;
      board?: string;
    },
  ): Promise<void> {
    const department = this.departments.find(
      (department) => department.name === name,
    );
  }
}
