import { Injectable } from '@nestjs/common';
import {
  ConflictException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { FindAllDepartmentsUseCase } from 'src/domain/use-cases/department/find-all-departments';
import { FindDepartmentByIdUseCase } from 'src/domain/use-cases/department/find-department-by-id';
import { UpdateDepartmentUseCase } from 'src/domain/use-cases/department/update-department';
import { CreateDepartmentUseCase } from '../../domain/use-cases/department/create-department';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    private createUseCase: CreateDepartmentUseCase,
    private findAllUseCase: FindAllDepartmentsUseCase,
    private findByIdUseCase: FindDepartmentByIdUseCase,
    private updateCostCenterUseCase: UpdateDepartmentUseCase,
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
      const { departments, totalCount } = await this.findAllUseCase.execute(
        skip,
        take,
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

  async update(
    id: number,
    name: string,
    cost_center: number,
    is_board: boolean,
    board: string,
    responsible_id: string,
  ) {
    try {
      const { department } = await this.updateCostCenterUseCase.execute(
        id,
        name,
        cost_center,
        is_board,
        board,
        responsible_id,
      );
      return {
        department: department.props,
      };
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }
}
