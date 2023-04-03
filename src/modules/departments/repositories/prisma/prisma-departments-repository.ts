import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/database/prisma.service';
import { Department } from '../../entities/department';
import { DepartmentsRepository } from '../departments-repository';

@Injectable()
export default class PrismaDepartmentsRepository
  implements DepartmentsRepository
{
  constructor(private prisma: PrismaService) {}

  async create(department: Department) {
    return this.prisma.departments.create({
      data: {
        name: department.name,
        cost_center: department.cost_center,
        is_board: department.is_board,
        board: department.board,
      },
    });
  }

  findAll() {
    return this.prisma.departments.findMany();
  }

  findByName(name: string) {
    return this.prisma.departments.findUnique({
      where: { name },
    });
  }
}
