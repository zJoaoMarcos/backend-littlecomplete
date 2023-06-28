import { PaginationParams } from '@/core/repositories/pagination-params';
import { IDepartmentRepository } from '@/domain/employees/repository/department.repository';
import { DepartmentNotFoundError } from './errors/department-not-found-error';

interface FetchAllDepartmentRequest {
  params?: PaginationParams;
}

interface FetchAllDepartmentResponse {
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
}

export class FetchAllDepartmentsUseCase {
  constructor(private departmentsRepository: IDepartmentRepository) {}

  async execute({
    params,
  }: FetchAllDepartmentRequest): Promise<FetchAllDepartmentResponse> {
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
