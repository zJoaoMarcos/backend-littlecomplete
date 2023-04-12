import { Department } from 'src/core/entity/department';
import { DepartmentRepositoryInterface } from 'src/core/repository/department-repository';
import { Repository } from 'typeorm';

export class TypeOrmDepartmentRepository
  implements DepartmentRepositoryInterface
{
  constructor(private ormRepo: Repository<Department>) {}

  async create(
    name: string,
    cost_center: number,
    is_board: boolean,
    board: string,
  ): Promise<Department> {
    return this.ormRepo.save({ name, cost_center, is_board, board });
  }

  async findAll(): Promise<Department[]> {
    return this.ormRepo.find();
  }

  async findByName(name: string): Promise<Department> {
    return this.ormRepo.findOneBy({ name });
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
        name: data.name,
        cost_center: data.cost_center,
        is_board: data.is_board,
        board: data.board,
      },
    );
  }
}
