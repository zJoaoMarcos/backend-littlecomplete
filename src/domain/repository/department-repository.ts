import { Department } from '../entity/department';

export interface IDepartmentRepository {
  create(
    name: string,
    cost_center: number,
    is_board: boolean,
    board: string,
    responsible_id: string,
  ): Promise<Department>;

  findAll(skip?: number, take?: number): Promise<FindAllDepartmentsResponse>;

  findByName(departmentName: string): Promise<Department>;

  findById(departmentId: number): Promise<Department>;

  update(
    id: number,
    name: string,
    cost_center: number,
    is_board: boolean,
    board: string,
    responsible_id: string,
  ): Promise<void>;
}

export type FindAllDepartmentsResponse = {
  departments: Department[];
  totalCount: number;
};
