import { IDepartmentRepository } from 'src/domain/repository/department-repository';
import { DepartmentNotFoundError } from '../errors/department-not-found';

export class UpdateDepartmentUseCase {
  constructor(private departmentsRepository: IDepartmentRepository) {}

  async execute(
    id: number,
    name: string,
    cost_center: number,
    is_board: boolean,
    board: string,
    responsible_id: string,
  ): Promise<UpdateDepartmentOutput> {
    const department = await this.departmentsRepository.findById(id);

    if (!department) {
      throw new DepartmentNotFoundError();
    }

    await this.departmentsRepository.update(
      department.id,
      name,
      cost_center,
      is_board,
      board,
      responsible_id,
    );

    return {
      department,
    };
  }
}

type UpdateDepartmentOutput = {
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
