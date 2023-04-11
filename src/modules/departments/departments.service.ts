import { ConflictException, Injectable } from '@nestjs/common';
import { FindAllDepartmentsUseCase } from 'src/core/use-cases/department/find-all-departments';
import { CreateDepartmentUseCase } from '../../core/use-cases/department/create-department';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    private createUseCase: CreateDepartmentUseCase,
    private findAllUseCase: FindAllDepartmentsUseCase,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto) {
    try {
      return this.createUseCase.execute(createDepartmentDto);
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }

  async findAll() {
    return this.findAllUseCase.execute();
  }
}
