import { IDepartmentRepository } from 'src/domain/employees/repository/department.repository';
import { Department } from '../entity/department';
import { IUserRepository } from '../repository/user.repository';
import { DepartmentAlreadyExistsError } from './errors/department-already-exists-error';
import { DepartmentNotFoundError } from './errors/department-not-found-error';
import { ResponsibleNotFoundError } from './errors/responsible-not-found-error';

interface EditDepartmentInput {
  id: number;
  name: string;
  cost_center: number;
  is_board: boolean;
  board: string;
  responsible_id: string;
}

interface EditDepartmentOutput {
  department: Department;
}

export class EditDepartmentUseCase {
  constructor(
    private departmentRepository: IDepartmentRepository,
    private usersRepository: IUserRepository,
  ) {}

  async execute({
    id,
    name,
    cost_center,
    is_board,
    board,
    responsible_id,
  }: EditDepartmentInput): Promise<EditDepartmentOutput> {
    const department = await this.departmentRepository.findById(id);

    if (!department) {
      throw new DepartmentNotFoundError();
    }

    if (name !== department.name) {
      const departmentWithSameAlreadyExists =
        await this.departmentRepository.findByName(name);

      if (departmentWithSameAlreadyExists) {
        throw new DepartmentAlreadyExistsError();
      }

      department.name = name;
    }

    if (responsible_id !== department.responsible_id) {
      const responsibleExist = await this.usersRepository.findByUserName(
        responsible_id,
      );

      if (!responsibleExist) {
        throw new ResponsibleNotFoundError();
      }

      department.responsible_id = responsible_id;
    }

    department.cost_center = cost_center;
    department.is_board = is_board;
    department.board = board;
    department.responsible_id = responsible_id;

    await this.departmentRepository.save(department);

    return {
      department,
    };
  }
}
