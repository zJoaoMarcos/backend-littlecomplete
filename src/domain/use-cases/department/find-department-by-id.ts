import { IDepartmentRepository } from 'src/domain/repository/department-repository';
import { DepartmentNotFoundError } from '../errors/department-not-found';

export class FindDepartmentByIdUseCase {
  constructor(private departmentsRepository: IDepartmentRepository) {}

  async execute(id: number): Promise<FindDepartmentByIdOutput> {
    const department = await this.departmentsRepository.findById(id);

    if (!department) {
      throw new DepartmentNotFoundError();
    }

    return {
      department,
    };
  }
}

type FindDepartmentByIdOutput = {
  department: {
    props: {
      id: number;
      name: string;
      cost_center: number;
      is_board: boolean;
      board: string;
      responsible_id: string;
    };
  };
};
