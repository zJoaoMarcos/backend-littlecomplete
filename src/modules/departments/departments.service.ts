import { Injectable } from '@nestjs/common';
import {
  ConflictException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { FindAllDepartmentsUseCase } from 'src/core/use-cases/department/find-all-departments';
import { FindByNameDepartmentUseCase } from 'src/core/use-cases/department/find-department-by-name';
import { UpdateDepartmentUseCase } from 'src/core/use-cases/department/update-department';
import { CreateDepartmentUseCase } from '../../core/use-cases/department/create-department';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    private createUseCase: CreateDepartmentUseCase,
    private findAllUseCase: FindAllDepartmentsUseCase,
    private findByNameUseCase: FindByNameDepartmentUseCase,
    private updateUseCase: UpdateDepartmentUseCase,
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

  async update(name: string, data: UpdateDepartmentDto) {
    try {
      return this.updateUseCase.execute(name, data);
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }
}
