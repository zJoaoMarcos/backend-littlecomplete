import { Module } from '@nestjs/common';
import { DepartmentRepositoryInterface } from 'src/core/repository/department/department-repository';
import { CreateDepartmentUseCase } from 'src/core/use-cases/department/create-department';
import { FindAllDepartmentsUseCase } from 'src/core/use-cases/department/find-all-departments';
import { InMemoryDepartmentRepository } from 'src/infra/repository/department/in-memory/in-memory-department-repository';
import { PrismaDepartmentRepository } from 'src/infra/repository/department/prisma/prisma-department-repository';
import { PrismaService } from 'src/infra/services/database/prisma.service';
import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';

@Module({
  controllers: [DepartmentsController],
  providers: [
    DepartmentsService,
    PrismaService,
    {
      provide: PrismaDepartmentRepository,
      useClass: PrismaDepartmentRepository,
    },
    {
      provide: InMemoryDepartmentRepository,
      useClass: InMemoryDepartmentRepository,
    },
    {
      provide: CreateDepartmentUseCase,
      useFactory: (departmentRepo: DepartmentRepositoryInterface) => {
        return new CreateDepartmentUseCase(departmentRepo);
      },
      inject: [InMemoryDepartmentRepository],
    },
    {
      provide: FindAllDepartmentsUseCase,
      useFactory: (departmentRepo: DepartmentRepositoryInterface) => {
        return new FindAllDepartmentsUseCase(departmentRepo);
      },
      inject: [InMemoryDepartmentRepository],
    },
  ],
})
export class DepartmentsModule {}
