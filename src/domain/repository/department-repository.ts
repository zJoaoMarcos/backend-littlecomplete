import { Department } from '../entity/department';

export interface IDepartmentRepository {
  create(
    name: string,
    cost_center: number,
    is_board: boolean,
    board: string,
  ): Promise<Department>;

  findAll(): Promise<Department[]>;

  findByName(name: string): Promise<Department>;

  update(
    name: string,
    data: {
      name?: string;
      cost_center?: number;
      is_board?: boolean;
      board?: string;
    },
  ): Promise<void>;
}
