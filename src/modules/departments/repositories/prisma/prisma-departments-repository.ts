import { Injectable } from '@nestjs/common';
import { departments, Prisma } from '@prisma/client';
import { PrismaService } from 'src/services/database/prisma.service';
import { DepartmentsRepository } from '../departments-repository';

@Injectable()
export default class PrismaDepartmentsRepository
  implements DepartmentsRepository
{
  constructor(private prisma: PrismaService) {}

  async register(data: Prisma.departmentsCreateInput): Promise<departments> {
    return this.prisma.departments.create({
      data,
    });
  }

  async findById(
    departmentsWhereUniqueInput: Prisma.departmentsWhereUniqueInput,
  ): Promise<departments | null> {
    return this.prisma.departments.findUnique({
      where: departmentsWhereUniqueInput,
    });
  }

  async findAll(): Promise<departments[]> {
    return this.prisma.departments.findMany();
  }
}
