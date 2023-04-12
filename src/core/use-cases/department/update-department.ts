import { DepartmentRepositoryInterface } from 'src/core/repository/department-repository';
import { DepartmentAlreadyExistsError } from './errors/department-already-exits-error';
import { DepartmentNotFoundError } from './errors/department-not-found';

export class UpdateDepartmentUseCase {
  constructor(private departmentsRepository: DepartmentRepositoryInterface) {}

  async execute(
    name: string,
    data: UpdateDepartmentInput,
  ): Promise<UpdateDepartmentOutput> {
    const department = await this.departmentsRepository.findByName(name);

    if (!department) {
      throw new DepartmentNotFoundError();
    }

    const departmentWithSameName = await this.departmentsRepository.findByName(
      data.name,
    );

    if (departmentWithSameName) {
      throw new DepartmentAlreadyExistsError();
    }

    await this.departmentsRepository.update(name, data);

    return {
      department,
    };
  }
}

type UpdateDepartmentInput = {
  name?: string;
  cost_center?: number;
  is_board?: boolean;
  board?: string;
};

type UpdateDepartmentOutput = {
  department: {
    name: string;
    cost_center: number;
    is_board: boolean;
    board: string;
  };
};
