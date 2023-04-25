import { IDepartmentRepository } from 'src/domain/repository/department-repository';
import { DepartmentNotFoundError } from '../errors/department-not-found';

export class FindByNameDepartmentUseCase {
  constructor(private departmentsRepository: IDepartmentRepository) {}

  async execute(name: string): Promise<FindByNameDepartmentOutput> {
    const department = await this.departmentsRepository.findByName(name);

    if (!department) {
      throw new DepartmentNotFoundError();
    }

    return {
      department,
    };
  }
}

type FindByNameDepartmentOutput = {
  department: {
    props: {
      name: string;
      cost_center: number;
      is_board: boolean;
      board: string;
    };
  };
};
