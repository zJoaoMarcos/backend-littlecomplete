import { Department } from 'src/domain/entity/department';
import { IDepartmentRepository } from 'src/domain/repository/department-repository';
import { Repository } from 'typeorm';
import { DepartmentSchema } from './entities/department.schema';

export class TypeOrmDepartmentRepository implements IDepartmentRepository {
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

    return Department.create({
      name: department.name,
      cost_center: department.costCenter,
      is_board: department.isBoard,
      board: department.board,
    });
  }

  async findAll(): Promise<Department[]> {
    const departments = await this.ormRepo.find();

    if (!departments) {
      return null;
    }

    return departments.map((department) => {
      return Department.create({
        name: department.name,
        cost_center: department.costCenter,
        is_board: department.isBoard,
        board: department.board,
      });
    });
  }

  async findByName(name: string): Promise<Department | null> {
    const department = await this.ormRepo.findOneBy({ name });

    if (!department) {
      return null;
    }

    return Department.create({
      name: department.name,
      cost_center: department.costCenter,
      is_board: department.isBoard,
      board: department.board,
    });
  }

  async updateCostCenter(name: string, cost_center: number): Promise<void> {
    await this.ormRepo.update(
      { name },
      {
        costCenter: cost_center,
      },
    );
  }
}
