import { Department } from '../entities/department';
import { DepartmentsRepository } from '../repositories/departments-repository';
import { DepartmentNotFoundError } from './errors/department-not-found';

export interface FindByNameDepartmentUseCaseResponse {
  department: Department;
}

export class FindByNameDepartmentUseCase {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  async execute(name: string): Promise<FindByNameDepartmentUseCaseResponse> {
    const department = await this.departmentsRepository.findByName(name);

    if (!department) {
      throw new DepartmentNotFoundError();
    }

    return {
      department,
    };
  }
}
