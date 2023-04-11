import { Department } from 'src/core/entity/deparment/department';
import { DepartmentRepositoryInterface } from 'src/core/repository/department/department-repository';
import { PrismaService } from 'src/infra/services/database/prisma.service';

export class PrismaDepartmentRepository
  implements DepartmentRepositoryInterface
{
  constructor(private prismaService: PrismaService) {}

  async create(
    name: string,
    cost_center: number,
    is_board: boolean,
    board: string,
  ): Promise<Department> {
    return this.prismaService.departments.create({
      data: {
        name,
        cost_center,
        is_board,
        board,
      },
    });
  }

  findAll(): Promise<Department[]> {
    return this.prismaService.departments.findMany();
  }

  findByName(name: string): Promise<Department> {
    return this.prismaService.departments.findUnique({
      where: {
        name,
      },
    });
  }

  update(
    name: string,
    data: {
      name?: string;
      cost_center?: number;
      is_board?: boolean;
      board?: string;
    },
  ): Promise<Department> {
    return this.prismaService.departments.update({
      where: {
        name,
      },
      data,
    });
  }
}
