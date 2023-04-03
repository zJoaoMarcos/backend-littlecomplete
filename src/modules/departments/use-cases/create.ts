import { Injectable } from '@nestjs/common/decorators';
import { CreateDepartmentDto } from '../dto/create-department.dto';
import { DepartmentsRepository } from '../repositories/departments-repository';
import { DepartmentAlreadyExistsError } from './errors/department-already-exits-error';

@Injectable()
export class CreateDepartmentUseCase {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  async execute(data: CreateDepartmentDto) {
    const departmentAlreadyExists = await this.departmentsRepository.findById({
      department: data.department,
    });

    if (departmentAlreadyExists) {
      throw new DepartmentAlreadyExistsError();
    }

    const department = await this.departmentsRepository.register(data);

    return {
      department,
    };
  }
}
