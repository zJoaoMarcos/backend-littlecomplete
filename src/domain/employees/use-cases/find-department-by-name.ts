import { IDepartmentRepository } from '@/domain/employees/repository/department.repository';
import { DepartmentNotFoundError } from './errors/department-not-found-error';

export class FindDepartmentByNameUseCase {
  constructor(private departmentsRepository: IDepartmentRepository) {}

  async execute(name: string): Promise<FindDepartmentByNameOutput> {
    const department = await this.departmentsRepository.findByName(name);

    if (!department) {
      throw new DepartmentNotFoundError();
    }

    return {
      department,
    };
  }
}

type FindDepartmentByNameOutput = {
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
