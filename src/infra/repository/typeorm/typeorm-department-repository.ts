import { Department } from 'src/core/entity/department';
import { DepartmentRepositoryInterface } from 'src/core/repository/department-repository';
import { Repository } from 'typeorm';
import { DepartmentSchema } from './entities/department.schema';

export class TypeOrmDepartmentRepository
  implements DepartmentRepositoryInterface
{
  constructor(private ormRepo: Repository<DepartmentSchema>) {}

  async create(
    name: string,
    cost_center: number,
    is_board: boolean,
    board: string,
  ): Promise<Department> {
    const department = await this.ormRepo.save({
      name: name,
      costCenter: cost_center,
      isBoard: is_board,
      board: board,
    });

    return new Department(
      department.name,
      department.costCenter,
      department.isBoard,
      department.board,
    );
  }

  async findAll(): Promise<Department[]> {
    const departments = await this.ormRepo.find();

    if (!departments) {
      return null;
    }

    return departments.map((department) => {
      return new Department(
        department.name,
        department.costCenter,
        department.isBoard,
        department.board,
      );
    });
  }

  async findByName(name: string): Promise<Department | null> {
    const department = await this.ormRepo.findOneBy({ name });

    if (!department) {
      return null;
    }

    return new Department(
      department.name,
      department.costCenter,
      department.isBoard,
      department.board,
    );
  }

  async update(
    name: string,
    data: {
      name?: string;
      cost_center?: number;
      is_board?: boolean;
      board?: string;
    },
  ): Promise<void> {
    await this.ormRepo.update(
      { name },
      {
        ...data,
      },
    );
  }
}
