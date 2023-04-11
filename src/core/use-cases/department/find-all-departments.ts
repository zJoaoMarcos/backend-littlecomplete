import { DepartmentRepositoryInterface } from 'src/core/repository/department/department-repository';
import { DepartmentNotFoundError } from './errors/department-not-found';

export class FindAllDepartmentsUseCase {
  constructor(private departmentsRepository: DepartmentRepositoryInterface) {}

  async execute(): Promise<FindAllDepartmentOutput> {
    const department = await this.departmentsRepository.findAll();

    if (!department) {
      throw new DepartmentNotFoundError();
    }

    return {
      department,
    };
  }
}

type FindAllDepartmentOutput = {
  department: {
    name: string;
    cost_center: number;
    is_board: boolean;
    board: string;
  }[];
};
