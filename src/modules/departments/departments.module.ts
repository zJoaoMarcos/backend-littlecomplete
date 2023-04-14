import { Module } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { Department } from 'src/core/entity/department';
import { DepartmentRepositoryInterface } from 'src/core/repository/department-repository';
import { CreateDepartmentUseCase } from 'src/core/use-cases/department/create-department';
import { FindAllDepartmentsUseCase } from 'src/core/use-cases/department/find-all-departments';
import { FindByNameDepartmentUseCase } from 'src/core/use-cases/department/find-department-by-name';
import { UpdateDepartmentUseCase } from 'src/core/use-cases/department/update-department';
import { InMemoryDepartmentRepository } from 'src/infra/repository/in-memory/in-memory-department-repository';
import { TypeOrmDepartmentRepository } from 'src/infra/repository/typeorm/typeorm-department-repository';
import { DataSource } from 'typeorm';
import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Department])],
  controllers: [DepartmentsController],
  providers: [
    DepartmentsService,
    {
      provide: TypeOrmDepartmentRepository,
      useFactory: (dataSource: DataSource) => {
        return new TypeOrmDepartmentRepository(
          dataSource.getRepository(Department),
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
    {
      provide: FindByNameDepartmentUseCase,
      useFactory: (departmentRepo: DepartmentRepositoryInterface) => {
        return new FindByNameDepartmentUseCase(departmentRepo);
      },
      inject: [InMemoryDepartmentRepository],
    },
    {
      provide: UpdateDepartmentUseCase,
      useFactory: (departmentRepo: DepartmentRepositoryInterface) => {
        return new UpdateDepartmentUseCase(departmentRepo);
      },
      inject: [InMemoryDepartmentRepository],
    },
  ],
})
export class DepartmentsModule {}
