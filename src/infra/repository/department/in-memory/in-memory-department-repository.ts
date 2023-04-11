import { Department } from 'src/core/entity/deparment/department';
import { DepartmentRepositoryInterface } from 'src/core/repository/department/department-repository';

export class InMemoryDepartmentRepository
  implements DepartmentRepositoryInterface
{
  departments: Department[] = [];

  async create(
    name: string,
    cost_center: number,
    is_board: boolean,
    board: string,
  ): Promise<Department> {
    const department = {
      name,
      cost_center,
      is_board,
      board,
    };

    this.departments.push(department);

    return department;
  }

  async findAll(): Promise<Department[]> {
    return Promise.resolve(this.departments);
  }

  findByName(name: string): Promise<Department> {
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
  ): Promise<Department> {
    const department = this.departments.find(
      (department) => department.name === name,
    );

    department.name = data.name !== undefined ? data.name : department.name;
    department.cost_center =
      data.cost_center !== undefined
        ? data.cost_center
        : department.cost_center;
    department.is_board =
      data.is_board !== undefined ? data.is_board : department.is_board;
    department.board = data.board !== undefined ? data.board : department.board;

    return Promise.resolve(department);
  }
}
