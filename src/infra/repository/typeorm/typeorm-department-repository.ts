import { Department } from 'src/domain/entity/department';
import {
  FindAllDepartmentsResponse,
  IDepartmentRepository,
} from 'src/domain/repository/department-repository';
import { Repository } from 'typeorm';
import { DepartmentSchema } from './entities/department.schema';

export class TypeOrmDepartmentRepository implements IDepartmentRepository {
  constructor(private ormRepo: Repository<DepartmentSchema>) {}

  async create(
    name: string,
    cost_center: number,
    is_board: boolean,
    board: string,
    responsible_id: string,
  ): Promise<Department> {
    const department = await this.ormRepo.save({
      name: name,
      costCenter: cost_center,
      isBoard: is_board,
      board: board,
      responsibleId: responsible_id,
    });

    return Department.create({
      id: department.id,
      name: department.name,
      cost_center: department.costCenter,
      is_board: department.isBoard,
      board: department.board,
      responsible_id: department.responsibleId,
    });
  }

  async findAll(
    skip?: number,
    take?: number,
  ): Promise<FindAllDepartmentsResponse> {
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

  async findByName(name: string): Promise<Department | null> {
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

  async update(
    id: number,
    name: string,
    cost_center: number,
    is_board: boolean,
    board: string,
    responsible_id: string,
  ): Promise<void> {
    await this.ormRepo.update(
      { id: id },
      {
        name: name,
        costCenter: cost_center,
        board: board,
        isBoard: is_board,
        responsibleId: responsible_id,
      },
    );
  }
}
