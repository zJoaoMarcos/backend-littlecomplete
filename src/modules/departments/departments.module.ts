import { Module } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { IDepartmentRepository } from 'src/domain/repository/department-repository';
import { CreateDepartmentUseCase } from 'src/domain/use-cases/department/create-department';
import { FindAllDepartmentsUseCase } from 'src/domain/use-cases/department/find-all-departments';
import { FindByNameDepartmentUseCase } from 'src/domain/use-cases/department/find-department-by-name';
import { UpdateCostCenterDepartmentUseCase } from 'src/domain/use-cases/department/update-cost-center-department';
import { InMemoryDepartmentRepository } from 'src/infra/repository/in-memory/in-memory-department-repository';
import { DepartmentSchema } from 'src/infra/repository/typeorm/entities/department.schema';
import { TypeOrmDepartmentRepository } from 'src/infra/repository/typeorm/typeorm-department-repository';
import { DataSource } from 'typeorm';
import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentSchema])],
  controllers: [DepartmentsController],
  providers: [
    DepartmentsService,
    {
      provide: TypeOrmDepartmentRepository,
      useFactory: (dataSource: DataSource) => {
        return new TypeOrmDepartmentRepository(
          dataSource.getRepository(DepartmentSchema),
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
      useFactory: (departmentRepo: IDepartmentRepository) => {
        return new CreateDepartmentUseCase(departmentRepo);
      },
      inject: [TypeOrmDepartmentRepository],
    },
    {
      provide: FindAllDepartmentsUseCase,
      useFactory: (departmentRepo: IDepartmentRepository) => {
        return new FindAllDepartmentsUseCase(departmentRepo);
      },
      inject: [TypeOrmDepartmentRepository],
    },
    {
      provide: FindByNameDepartmentUseCase,
      useFactory: (departmentRepo: IDepartmentRepository) => {
        return new FindByNameDepartmentUseCase(departmentRepo);
      },
      inject: [TypeOrmDepartmentRepository],
    },
    {
      provide: UpdateCostCenterDepartmentUseCase,
      useFactory: (departmentRepo: IDepartmentRepository) => {
        return new UpdateCostCenterDepartmentUseCase(departmentRepo);
      },
      inject: [TypeOrmDepartmentRepository],
    },
  ],
})
export class DepartmentsModule {}
