import { Department } from '../entities/department';
import { DepartmentsRepository } from '../repositories/departments-repository';
import { DepartmentNotFoundError } from './errors/department-not-found';

export interface FindAllDepartmentsUseCaseResponse {
  department: Department[];
}

export class FindAllDepartmentsUseCase {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  async execute(): Promise<FindAllDepartmentsUseCaseResponse> {
    const department = await this.departmentsRepository.findAll();

    if (!department) {
      throw new DepartmentNotFoundError();
    }

    return {
      department,
    };
  }
}
