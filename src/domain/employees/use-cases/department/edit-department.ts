/* eslint-disable @typescript-eslint/ban-types */
import { DepartmentNotFoundError } from '@/domain/errors/department-not-found';
import { IDepartmentRepository } from 'src/domain/employees/repository/department.repository';

export class EditDepartmentUseCase {
  constructor(private departmentsRepository: IDepartmentRepository) {}

  async execute({
    id,
    name,
    cost_center,
    is_board,
    board,
    responsible_id,
  }: EditDepartmentInput): Promise<EditDepartmentOutput> {
    const department = await this.departmentsRepository.findById(id);

    if (!department) {
      throw new DepartmentNotFoundError();
    }

    department.name = name;
    department.cost_center = cost_center;
    department.is_board = is_board;
    department.board = board;
    department.responsible_id = responsible_id;

    await this.departmentsRepository.save(department);

    return {};
  }
}

type EditDepartmentInput = {
  id: number;
  name: string;
  cost_center: number;
  is_board: boolean;
  board: string;
  responsible_id: string;
};

type EditDepartmentOutput = {};
