import { Module } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { Equipment } from 'src/core/entity/equipment';
import { DepartmentRepositoryInterface } from 'src/core/repository/department-repository';
import { EquipmentRepositoryInterface } from 'src/core/repository/equipment-repository';
import { CreateEquipmentUseCase } from 'src/core/use-cases/equipment/create-equipment';
import { FindAllEquipmentsUseCase } from 'src/core/use-cases/equipment/find-all-equipments';
import { FindEquipmentByIdUseCase } from 'src/core/use-cases/equipment/find-equipment-by-id';
import { updateEquipmentDepartmentUseCase } from 'src/core/use-cases/equipment/update-equipment';
import { DepartmentSchema } from 'src/infra/repository/typeorm/entities/department.schema';
import { TypeOrmDepartmentRepository } from 'src/infra/repository/typeorm/typeorm-department-repository';
import { TypeOrmEquipmentRepository } from 'src/infra/repository/typeorm/typeorm-equipment-repository';
import { DataSource } from 'typeorm';
import { EquipmentsController } from './equipments.controller';
import { EquipmentsService } from './equipments.service';

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentSchema, Equipment])],
  controllers: [EquipmentsController],
  providers: [
    EquipmentsService,
    {
      provide: TypeOrmEquipmentRepository,
      useFactory: (dataSource: DataSource) => {
        return new TypeOrmEquipmentRepository(
          dataSource.getRepository(Equipment),
        );
      },
      inject: [getDataSourceToken()],
    },
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
      provide: CreateEquipmentUseCase,
      useFactory: (
        equipmentRepo: EquipmentRepositoryInterface,
        departmentRepo: DepartmentRepositoryInterface,
      ) => {
        return new CreateEquipmentUseCase(equipmentRepo, departmentRepo);
      },
      inject: [TypeOrmEquipmentRepository, TypeOrmDepartmentRepository],
    },
    {
      provide: FindAllEquipmentsUseCase,
      useFactory: (equipmentRepo: EquipmentRepositoryInterface) => {
        return new FindAllEquipmentsUseCase(equipmentRepo);
      },
      inject: [TypeOrmEquipmentRepository],
    },
    {
      provide: FindEquipmentByIdUseCase,
      useFactory: (equipmentRepo: EquipmentRepositoryInterface) => {
        return new FindAllEquipmentsUseCase(equipmentRepo);
      },
      inject: [TypeOrmEquipmentRepository],
    },
    {
      provide: updateEquipmentDepartmentUseCase,
      useFactory: (
        equipmentRepo: EquipmentRepositoryInterface,
        departmentRepo: DepartmentRepositoryInterface,
      ) => {
        return new updateEquipmentDepartmentUseCase(
          equipmentRepo,
          departmentRepo,
        );
      },
      inject: [TypeOrmEquipmentRepository],
    },
  ],
})
export class EquipmentsModule {}
