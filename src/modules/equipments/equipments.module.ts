import { Module } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { IDepartmentRepository } from 'src/domain/repository/department-repository';
import { IEquipmentRepository } from 'src/domain/repository/equipment-repository';
import { CreateEquipmentUseCase } from 'src/domain/use-cases/equipment/create-equipment';
import { EditEquipmentUseCase } from 'src/domain/use-cases/equipment/edit-equipment';
import { FetchAllEquipmentsUseCase } from 'src/domain/use-cases/equipment/fetch-all-equipments';
import { FindEquipmentByIdUseCase } from 'src/domain/use-cases/equipment/find-equipment-by-id';
import { DepartmentsSchema } from 'src/infra/repository/typeorm/entities/departments.schema';
import { EquipmentsSchema } from 'src/infra/repository/typeorm/entities/equipments.schema';
import { TypeOrmDepartmentRepository } from 'src/infra/repository/typeorm/typeorm-department-repository';
import { TypeOrmEquipmentRepository } from 'src/infra/repository/typeorm/typeorm-equipment-repository';
import { DataSource } from 'typeorm';
import { EquipmentsController } from './equipments.controller';
import { EquipmentsService } from './equipments.service';

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentsSchema, EquipmentsSchema])],
  controllers: [EquipmentsController],
  providers: [
    EquipmentsService,
    {
      provide: TypeOrmEquipmentRepository,
      useFactory: (dataSource: DataSource) => {
        return new TypeOrmEquipmentRepository(
          dataSource.getRepository(EquipmentsSchema),
        );
      },
      inject: [getDataSourceToken()],
    },
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
      provide: CreateEquipmentUseCase,
      useFactory: (
        equipmentRepo: IEquipmentRepository,
        departmentRepo: IDepartmentRepository,
      ) => {
        return new CreateEquipmentUseCase(equipmentRepo, departmentRepo);
      },
      inject: [TypeOrmEquipmentRepository, TypeOrmDepartmentRepository],
    },
    {
      provide: FetchAllEquipmentsUseCase,
      useFactory: (equipmentRepo: IEquipmentRepository) => {
        return new FetchAllEquipmentsUseCase(equipmentRepo);
      },
      inject: [TypeOrmEquipmentRepository],
    },
    {
      provide: FindEquipmentByIdUseCase,
      useFactory: (equipmentRepo: IEquipmentRepository) => {
        return new FindEquipmentByIdUseCase(equipmentRepo);
      },
      inject: [TypeOrmEquipmentRepository],
    },
    {
      provide: EditEquipmentUseCase,
      useFactory: (
        equipmentRepo: IEquipmentRepository,
        departmentRepo: IDepartmentRepository,
      ) => {
        return new EditEquipmentUseCase(equipmentRepo, departmentRepo);
      },
      inject: [TypeOrmEquipmentRepository, TypeOrmDepartmentRepository],
    },
  ],
})
export class EquipmentsModule {}
