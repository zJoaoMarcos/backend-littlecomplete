import { PaginationParams } from '@/core/repositories/pagination-params';
import { CreateDepartmentUseCase } from '@/domain/employees/use-cases/create-department';
import { EditDepartmentUseCase } from '@/domain/employees/use-cases/edit-department';
import { FetchAllDepartmentsUseCase } from '@/domain/employees/use-cases/fetch-all-departments';
import { FindDepartmentByIdUseCase } from '@/domain/employees/use-cases/find-department-by-id';
import { Injectable } from '@nestjs/common';
import {
  ConflictException,
  NotFoundException,
} from '@nestjs/common/exceptions';
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
      const { department } = await this.createUseCase.execute({
        ...createDepartmentDto,
      });
      return department.props;
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }

  async findAll(params: PaginationParams) {
    try {
      const { departments, totalCount } = await this.findAllUseCase.execute({
        params,
      });
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
      const { department } = await this.updateCostCenterUseCase.execute({
        id,
        ...updateDepartmentDto,
      });

      return department.props;
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }
}
