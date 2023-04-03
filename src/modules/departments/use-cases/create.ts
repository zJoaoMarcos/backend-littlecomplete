import { Injectable } from '@nestjs/common/decorators';
import { CreateDepartmentDto } from '../dto/create-department.dto';
import { Department } from '../entities/department';
import { DepartmentsRepository } from '../repositories/departments-repository';
import { DepartmentAlreadyExistsError } from './errors/department-already-exits-error';

export interface CreateDepartmentUseCaseResponse {
  department: Department;
}

@Injectable()
export class CreateDepartmentUseCase {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  async execute({
    name,
    cost_center,
    is_board,
    board,
  }: CreateDepartmentDto): Promise<CreateDepartmentUseCaseResponse> {
    const departmentAlreadyExits = await this.departmentsRepository.findByName(
      name,
    );

    if (departmentAlreadyExits) {
      throw new DepartmentAlreadyExistsError();
    }

    const department = new Department({
      name,
      cost_center,
      is_board,
      board,
    });

    await this.departmentsRepository.create(department);

    return {
      department,
    };
  }
}
