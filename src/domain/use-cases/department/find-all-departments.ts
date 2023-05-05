import { IDepartmentRepository } from 'src/domain/repository/department-repository';
import { DepartmentNotFoundError } from '../errors/department-not-found';

export class FindAllDepartmentsUseCase {
  constructor(private departmentsRepository: IDepartmentRepository) {}

  async execute(
    skip?: number,
    take?: number,
  ): Promise<FindAllDepartmentOutput> {
    const { departments, totalCount } =
      await this.departmentsRepository.findAll(skip, take);

    if (!departments) {
      throw new DepartmentNotFoundError();
    }
    return {
      departments,
      totalCount,
    };
  }
}

type FindAllDepartmentOutput = {
  departments: {
    props: {
      id: number;
      name: string;
      cost_center: number;
      is_board: boolean;
      board: string;
      responsible_id: string;
    };
  }[];
  totalCount: number;
};
