import { Injectable } from '@nestjs/common';
import { DepartmentsRepository } from '../repositories/departments-repository';

@Injectable()
export class FindAllDepartmentUseCase {
  constructor(private departmentsRepository: DepartmentsRepository) {}

  async execute() {
    const departments = await this.departmentsRepository.findAll();

    console.log(departments);

    return {
      departments,
    };
  }
}
