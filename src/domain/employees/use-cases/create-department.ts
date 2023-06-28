import { randomInt } from 'node:crypto';

import { Department } from '@/domain/employees/entity/department';
import { IDepartmentRepository } from 'src/domain/employees/repository/department.repository';
import { IUserRepository } from '../repository/user.repository';
import { DepartmentAlreadyExistsError } from './errors/department-already-exists-error';
import { ResponsibleNotFoundError } from './errors/responsible-not-found-error';

interface CreateDepartmentInput {
  name: string;
  cost_center: number;
  is_board: boolean;
  board: string;
  responsible_id: string;
}

interface CreateDepartmentOutput {
  department: Department;
}

export class CreateDepartmentUseCase {
  constructor(
    private departmentRepository: IDepartmentRepository,
    private userRepository: IUserRepository,
  ) {}

  async execute({
    name,
    cost_center,
    is_board,
    board,
    responsible_id,
  }: CreateDepartmentInput): Promise<CreateDepartmentOutput> {
    const departmentAlreadyExists = await this.departmentRepository.findByName(
      name,
    );

    if (departmentAlreadyExists) {
      throw new DepartmentAlreadyExistsError();
    }

    const responsibleExists = await this.userRepository.findByUserName(
      responsible_id,
    );

    if (!responsibleExists) {
      throw new ResponsibleNotFoundError();
    }

    const department = Department.create({
      id: randomInt(1, 200),
      name,
      cost_center,
      is_board,
      board,
      responsible_id,
    });

    await this.departmentRepository.create(department);

    return {
      department,
    };
  }
}
