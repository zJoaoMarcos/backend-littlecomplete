import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from '../../dto/create-department.dto';
import { DepartmentsRepository } from '../departments-repository';

@Injectable()
export class InMemoryDepartmentsRepository implements DepartmentsRepository {
  public items: any = [];

  async create(data: CreateDepartmentDto) {
    const department = {
      name: data.name,
      cost_center: data.cost_center,
      is_board: data.is_board,
      board: data.board,
    };

    this.items.push(department);

    return {
      department,
    };
  }

  findByName(name: string) {
    const department = this.items.find((deparment) => deparment.name === name);

    if (!department) {
      return null;
    }

    return {
      department,
    };
  }
}
