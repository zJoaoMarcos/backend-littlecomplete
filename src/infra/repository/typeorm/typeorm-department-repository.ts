import { Department } from '@/domain/employees/entity/department';
import {
  FindManyOutput,
  IDepartmentRepository,
} from '@/domain/employees/repository/department.repository';
import { PaginationParams } from 'src/core/repositories/pagination-params';
import { ILike, Repository } from 'typeorm';
import { DepartmentsSchema } from './entities/departments.schema';

export class TypeOrmDepartmentRepository implements IDepartmentRepository {
  constructor(private ormRepo: Repository<DepartmentsSchema>) {}

  async create(department: Department): Promise<void> {
    await this.ormRepo.save({
      name: department.name,
      costCenter: department.cost_center,
      isBoard: department.is_board,
      board: department.board,
      responsibleId: { username: department.responsible_id },
    });
  }

  async findMany(params: PaginationParams): Promise<FindManyOutput> {
    const name = params.id ?? '';

    const [result, totalCount] = await this.ormRepo.findAndCount({
      skip: params.skip,
      take: params.take,
      order: {
        name: 'asc',
      },
      relations: {
        responsibleId: true,
      },
      where: {
        name: ILike(`%${name}%`),
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
        responsible_id: department.responsibleId
          ? department.responsibleId.username
          : null,
      });
    });

    return {
      departments,
      totalCount,
    };
  }

  async findByName(name: string): Promise<Department> {
    const department = await this.ormRepo.findOne({
      where: { name: name },
      relations: {
        responsibleId: true,
      },
    });

    if (!department) {
      return null;
    }

    return Department.create({
      id: department.id,
      name: department.name,
      cost_center: department.costCenter,
      is_board: department.isBoard,
      board: department.board,
      responsible_id: department.responsibleId
        ? department.responsibleId.username
        : null,
    });
  }

  async findById(departmentId: number): Promise<Department> {
    const department = await this.ormRepo.findOne({
      where: { id: departmentId },
      relations: {
        responsibleId: true,
      },
    });

    if (!department) {
      return null;
    }

    return Department.create({
      id: department.id,
      name: department.name,
      cost_center: department.costCenter,
      is_board: department.isBoard,
      board: department.board,
      responsible_id: department.responsibleId
        ? department.responsibleId.username
        : null,
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
        responsibleId: { username: department.responsible_id },
      },
    );
  }
}
