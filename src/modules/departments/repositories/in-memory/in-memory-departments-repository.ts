import { Injectable } from '@nestjs/common';
import { CreateDepartmentDto } from '../../dto/create-department.dto';
import { UpdateDepartmentDto } from '../../dto/update-department.dto';
import { DepartmentsRepository } from '../departments-repository';

interface Departments {
  name: string;
  cost_center: number;
  is_board: boolean;
  board: string;
}

@Injectable()
export class InMemoryDepartmentsRepository implements DepartmentsRepository {
  public items: Departments[] = [];

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

  async findAll() {
    return this.items;
  }

  async findByName(name: string) {
    const department = this.items.find((deparment) => deparment.name === name);

    if (!department) {
      return null;
    }

    return {
      department,
    };
  }

  async update(name: string, data: UpdateDepartmentDto) {
    const department = this.items.find(
      (department) => department.name === name,
    );

    department.name = data.name !== undefined ? data.name : department.name;
    department.cost_center =
      data.cost_center !== undefined
        ? data.cost_center
        : department.cost_center;
    department.is_board =
      data.is_board !== undefined ? data.is_board : department.is_board;
    department.board = data.board !== undefined ? data.board : department.board;

    return {
      department,
    };
  }
}
