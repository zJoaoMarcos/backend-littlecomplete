import { PaginationParams } from 'src/core/repositories/pagination-params';
import { Department } from 'src/domain/entity/department';
import {
  FindManyOutput,
  IDepartmentRepository,
} from 'src/domain/repository/department-repository';
import { Repository } from 'typeorm';
import { DepartmentsSchema } from './entities/departments.schema';

export class TypeOrmDepartmentRepository implements IDepartmentRepository {
  constructor(private ormRepo: Repository<DepartmentsSchema>) {}

  async create(department: Department): Promise<void> {
    await this.ormRepo.save({
      name: department.name,
      costCenter: department.cost_center,
      isBoard: department.is_board,
      board: department.board,
      responsibleId: department.responsible_id,
    });
  }

  async findMany(params: PaginationParams): Promise<FindManyOutput> {
    const { skip, take } = params;

    const [result, totalCount] = await this.ormRepo.findAndCount({
      skip: skip,
      take: take,
      order: {
        name: 'asc',
      },
    });

    if (!result) {
      return null;
    }

    const departments = result.map((department) => {
      return Department.create({
        id: department.id,
        name: department.name,
        cost_center: department.costCenter,
        is_board: department.isBoard,
        board: department.board,
        responsible_id: department.responsibleId,
      });
    });

    return {
      departments,
      totalCount,
    };
  }

  async findByName(name: string): Promise<Department> {
    const department = await this.ormRepo.findOneBy({ name: name });

    if (!department) {
      return null;
    }

    return Department.create({
      id: department.id,
      name: department.name,
      cost_center: department.costCenter,
      is_board: department.isBoard,
      board: department.board,
      responsible_id: department.responsibleId,
    });
  }

  async findById(departmentId: number): Promise<Department> {
    const department = await this.ormRepo.findOneBy({ id: departmentId });

    if (!department) {
      return null;
    }

    return Department.create({
      id: department.id,
      name: department.name,
      cost_center: department.costCenter,
      is_board: department.isBoard,
      board: department.board,
      responsible_id: department.responsibleId,
    });
  }

  async save(department: Department): Promise<void> {
    await this.ormRepo.update(
      { id: department.id },
      {
        name: department.name,
        costCenter: department.cost_center,
        board: department.board,
        isBoard: department.is_board,
        responsibleId: department.responsible_id,
      },
    );
  }
}
