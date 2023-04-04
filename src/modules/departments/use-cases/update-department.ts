import { UpdateDepartmentDto } from '../dto/update-department.dto';
import { Department } from '../entities/department';
import { DepartmentsRepository } from '../repositories/departments-repository';
import { DepartmentAlreadyExistsError } from './errors/department-already-exits-error';
import { DepartmentNotFoundError } from './errors/department-not-found';

export interface UpdateDepartmentUseCaseResponse {
  department: Department;
}

export class UpdateDepartmentUseCase {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  async execute(
    name: string,
    data: UpdateDepartmentDto,
  ): Promise<UpdateDepartmentUseCaseResponse> {
    const department = await this.departmentsRepository.findByName(name);

    if (!department) {
      throw new DepartmentNotFoundError();
    }

    const departmentWithSameName = await this.departmentsRepository.findByName(
      data.name,
    );

    if (departmentWithSameName) {
      throw new DepartmentAlreadyExistsError();
    }

    await this.departmentsRepository.update(name, data);

    return {
      department,
    };
  }
}
