import { DepartmentRepositoryInterface } from 'src/core/repository/department-repository';
import { Department } from '../../../core/entity/department';
import { DepartmentAlreadyExistsError } from '../errors/department-already-exits-error';

export class CreateDepartmentUseCase {
  constructor(private departmentRepository: DepartmentRepositoryInterface) {}

  async execute({
    name,
    cost_center,
    is_board,
    board,
  }: CreateDepartmentInput): Promise<CreateDepartmentOutput> {
    const departmentAlreadyExists = await this.departmentRepository.findByName(
      name,
    );

    if (departmentAlreadyExists) {
      throw new DepartmentAlreadyExistsError();
    }

    const department = new Department(name, cost_center, is_board, board);

    await this.departmentRepository.create(
      department.name,
      department.cost_center,
      department.is_board,
      department.board,
    );

    return {
      department,
    };
  }
}

type CreateDepartmentInput = {
  name: string;
  cost_center: number;
  is_board: boolean;
  board: string;
};

type CreateDepartmentOutput = {
  department: {
    name: string;
    cost_center: number;
    is_board: boolean;
    board: string;
  };
};
