import { Injectable } from '@nestjs/common';
import {
  ConflictException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { EditDepartmentUseCase } from 'src/domain/use-cases/department/edit-department';
import { FetchAllDepartmentsUseCase } from 'src/domain/use-cases/department/fetch-all-departments';
import { FindDepartmentByIdUseCase } from 'src/domain/use-cases/department/find-department-by-id';
import { CreateDepartmentUseCase } from '../../domain/use-cases/department/create-department';
import { FindManyParamsDto } from '../shared/find-many-params.dto';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    private createUseCase: CreateDepartmentUseCase,
    private findAllUseCase: FetchAllDepartmentsUseCase,
    private findByIdUseCase: FindDepartmentByIdUseCase,
    private updateCostCenterUseCase: EditDepartmentUseCase,
  ) {}

  async create(createDepartmentDto: CreateDepartmentDto) {
    try {
      return this.createUseCase.execute(createDepartmentDto);
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }

  async findAll(params: FindManyParamsDto) {
    try {
      const { departments, totalCount } = await this.findAllUseCase.execute(
        params,
      );
      return {
        totalCount,
        departments: departments.map((department) => {
          return department.props;
        }),
      };
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async findById(id: number) {
    try {
      const { department } = await this.findByIdUseCase.execute(id);
      return {
        department: department.props,
      };
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    try {
      return this.updateCostCenterUseCase.execute({
        id,
        ...updateDepartmentDto,
      });
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }
}
