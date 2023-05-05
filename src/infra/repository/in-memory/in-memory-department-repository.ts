import { randomInt } from 'node:crypto';
import { Department } from '../../../domain/entity/department';
import {
  FindAllDepartmentsResponse,
  IDepartmentRepository,
} from '../../../domain/repository/department-repository';

export class InMemoryDepartmentRepository implements IDepartmentRepository {
  departments: Department[] = [];

  async create(
    name: string,
    cost_center: number,
    is_board: boolean,
    board: string,
    responsible_id: string,
  ): Promise<Department> {
    const department = Department.create({
      id: randomInt(1, 200),
      name,
      cost_center,
      is_board,
      board,
      responsible_id,
    });

    this.departments.push(department);

    return department;
  }

  async findAll(): Promise<FindAllDepartmentsResponse> {
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

  async update(
    id: number,
    name: string,
    cost_center: number,
    is_board: boolean,
    board: string,
    responsible_id: string,
  ): Promise<void> {
    const department = this.departments.find(
      (department) => department.id === id,
    );

    department.name = name;
    department.cost_center = cost_center;
    department.is_board = is_board;
    department.board = board;
    department.cost_center = cost_center;
    department.responsible_id = responsible_id;
  }
}
