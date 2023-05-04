import { IDepartmentRepository } from 'src/domain/repository/department-repository';
import { DepartmentNotFoundError } from '../errors/department-not-found';

export class FindAllDepartmentsUseCase {
  constructor(private departmentsRepository: IDepartmentRepository) {}

  async execute(
    skip?: number,
    take?: number,
  ): Promise<FindAllDepartmentOutput> {
    const department = await this.departmentsRepository.findAll(skip, take);

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
    props: {
      name: string;
      cost_center: number;
      is_board: boolean;
      board: string;
    };
  }[];
};
