/* eslint-disable @typescript-eslint/ban-types */
import { Department } from '@/domain/employees/entity/department';
import { DepartmentAlreadyExistsError } from '@/domain/errors/department-already-exits-error';
import { randomInt } from 'node:crypto';
import { IDepartmentRepository } from 'src/domain/employees/repository/department.repository';

export class CreateDepartmentUseCase {
  constructor(private departmentRepository: IDepartmentRepository) {}

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

    const department = Department.create({
      id: randomInt(1, 200),
      name,
      cost_center,
      is_board,
      board,
      responsible_id,
    });

    await this.departmentRepository.create(department);

    return {};
  }
}

type CreateDepartmentInput = {
  name: string;
  cost_center: number;
  is_board: boolean;
  board: string;
  responsible_id: string;
};

type CreateDepartmentOutput = {};
