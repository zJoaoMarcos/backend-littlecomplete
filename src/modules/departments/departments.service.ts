import { Injectable } from '@nestjs/common';
import {
  ConflictException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { FindAllDepartmentsUseCase } from 'src/domain/use-cases/department/find-all-departments';
import { FindByNameDepartmentUseCase } from 'src/domain/use-cases/department/find-department-by-name';
import { UpdateCostCenterDepartmentUseCase } from 'src/domain/use-cases/department/update-cost-center-department';
import { CreateDepartmentUseCase } from '../../domain/use-cases/department/create-department';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    private createUseCase: CreateDepartmentUseCase,
    private findAllUseCase: FindAllDepartmentsUseCase,
    private findByNameUseCase: FindByNameDepartmentUseCase,
    private updateCostCenterUseCase: UpdateCostCenterDepartmentUseCase,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto) {
    try {
      return this.createUseCase.execute(createDepartmentDto);
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }

  async findAll() {
    try {
      return this.findAllUseCase.execute();
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async findByName(id: string) {
    try {
      return this.findByNameUseCase.execute(id);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async update(name: string, cost_center: number) {
    try {
      return this.updateCostCenterUseCase.execute(name, cost_center);
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }
}
