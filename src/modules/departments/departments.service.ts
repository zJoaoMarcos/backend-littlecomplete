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
      const { department } = await this.createUseCase.execute(
        createDepartmentDto,
      );
      return {
        department: department.props,
      };
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }

  async findAll(skip?: number, take?: number) {
    try {
      const { department } = await this.findAllUseCase.execute(skip, take);
      return {
        departments: department.map((department) => {
          return department.props;
        }),
      };
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async findByName(id: string) {
    try {
      const { department } = await this.findByNameUseCase.execute(id);
      return {
        department: department.props,
      };
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async update(name: string, cost_center: number) {
    try {
      const { department } = await this.updateCostCenterUseCase.execute(
        name,
        cost_center,
      );
      return {
        department: department.props,
      };
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }
}
