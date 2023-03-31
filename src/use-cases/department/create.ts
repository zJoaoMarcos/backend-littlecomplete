import { Injectable } from '@nestjs/common/decorators';
import { CreateDepartmentBody } from 'src/dtos/create-equipment-body';
import { DepartmentsRepository } from 'src/repositories/equipments-repository';

@Injectable()
export class CreateDepartmentUseCase {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  async execute(data: CreateDepartmentBody) {
    const departmentAlreadyExists = await this.departmentsRepository.findById({
      department: data.department,
    });

    if (departmentAlreadyExists) {
      throw new Error('Department aleready exits');
    }

    const department = this.departmentsRepository.register(data);

    return {
      department,
    };
  }
}
