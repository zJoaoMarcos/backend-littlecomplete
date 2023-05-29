import { PaginationParams } from 'src/core/repositories/pagination-params';
import { IDepartmentRepository } from 'src/domain/repository/department-repository';
import { DepartmentNotFoundError } from '../errors/department-not-found';

export class FetchAllDepartmentsUseCase {
  constructor(private departmentsRepository: IDepartmentRepository) {}

  async execute(params: PaginationParams): Promise<FetchAllDepartmentOutput> {
    const { departments, totalCount } =
      await this.departmentsRepository.findMany(params);

    if (!departments) {
      throw new DepartmentNotFoundError();
    }
    return {
      departments,
      totalCount,
    };
  }
}

type FetchAllDepartmentOutput = {
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
