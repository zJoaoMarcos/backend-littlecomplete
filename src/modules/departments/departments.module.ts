import { IDepartmentRepository } from '@/domain/employees/repository/department.repository';

import { IUserRepository } from '@/domain/employees/repository/user.repository';
import { CreateDepartmentUseCase } from '@/domain/employees/use-cases/create-department';
import { EditDepartmentUseCase } from '@/domain/employees/use-cases/edit-department';
import { FetchAllDepartmentsUseCase } from '@/domain/employees/use-cases/fetch-all-departments';
import { FindDepartmentByIdUseCase } from '@/domain/employees/use-cases/find-department-by-id';
import { FindDepartmentByNameUseCase } from '@/domain/employees/use-cases/find-department-by-name';
import { InMemoryDepartmentRepository } from '@/infra/repository/in-memory/in-memory-department-repository';
import { DepartmentsSchema } from '@/infra/repository/typeorm/entities/departments.schema';
import { TypeOrmDepartmentRepository } from '@/infra/repository/typeorm/typeorm-department-repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentsSchema])],
  controllers: [DepartmentsController],
  providers: [
    DepartmentsService,
    {
      provide: TypeOrmDepartmentRepository,
      useFactory: (dataSource: DataSource) => {
        return new TypeOrmDepartmentRepository(
          dataSource.getRepository(DepartmentsSchema),
        );
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: InMemoryDepartmentRepository,
      useClass: InMemoryDepartmentRepository,
    },
    {
      provide: CreateDepartmentUseCase,
      useFactory: (
        departmentRepo: IDepartmentRepository,
        userRepo: IUserRepository,
      ) => {
        return new CreateDepartmentUseCase(departmentRepo, userRepo);
      },
      inject: [TypeOrmDepartmentRepository],
    },
    {
      provide: FetchAllDepartmentsUseCase,
      useFactory: (departmentRepo: IDepartmentRepository) => {
        return new FetchAllDepartmentsUseCase(departmentRepo);
      },
      inject: [TypeOrmDepartmentRepository],
    },
    {
      provide: FindDepartmentByNameUseCase,
      useFactory: (departmentRepo: IDepartmentRepository) => {
        return new FindDepartmentByNameUseCase(departmentRepo);
      },
      inject: [TypeOrmDepartmentRepository],
    },
    {
      provide: FindDepartmentByIdUseCase,
      useFactory: (departmentRepo: IDepartmentRepository) => {
        return new FindDepartmentByIdUseCase(departmentRepo);
      },
      inject: [TypeOrmDepartmentRepository],
    },
    {
      provide: EditDepartmentUseCase,
      useFactory: (
        departmentRepo: IDepartmentRepository,
        userRepo: IUserRepository,
      ) => {
        return new EditDepartmentUseCase(departmentRepo, userRepo);
      },
      inject: [TypeOrmDepartmentRepository],
    },
  ],
})
export class DepartmentsModule {}
