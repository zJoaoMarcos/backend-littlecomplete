import { IDepartmentRepository } from 'src/domain/repository/department-repository';
import { DepartmentNotFoundError } from '../errors/department-not-found';

export class UpdateCostCenterDepartmentUseCase {
  constructor(private departmentsRepository: IDepartmentRepository) {}

  async execute(
    name: string,
    cost_center: number,
  ): Promise<UpdateDepartmentOutput> {
    const department = await this.departmentsRepository.findByName(name);

    if (!department) {
      throw new DepartmentNotFoundError();
    }

    await this.departmentsRepository.updateCostCenter(name, cost_center);

    return {
      department,
    };
  }
}

type UpdateDepartmentOutput = {
  department: {
    name: string;
    cost_center: number;
    is_board: boolean;
    board: string;
  };
};
