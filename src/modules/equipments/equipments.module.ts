import { Module } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { IDepartmentRepository } from 'src/domain/repository/department-repository';
import { IEquipmentRepository } from 'src/domain/repository/equipment-repository';
import { CreateEquipmentUseCase } from 'src/domain/use-cases/equipment/create-equipment';
import { FindAllEquipmentsUseCase } from 'src/domain/use-cases/equipment/find-all-equipments';
import { FindEquipmentByIdUseCase } from 'src/domain/use-cases/equipment/find-equipment-by-id';
import { updateEquipmentDepartmentUseCase } from 'src/domain/use-cases/equipment/update-equipment-department';
import { DepartmentSchema } from 'src/infra/repository/typeorm/entities/department.schema';
import { EquipmentSchema } from 'src/infra/repository/typeorm/entities/equipments-schema';
import { TypeOrmDepartmentRepository } from 'src/infra/repository/typeorm/typeorm-department-repository';
import { TypeOrmEquipmentRepository } from 'src/infra/repository/typeorm/typeorm-equipment-repository';
import { DataSource } from 'typeorm';
import { EquipmentsController } from './equipments.controller';
import { EquipmentsService } from './equipments.service';

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentSchema, EquipmentSchema])],
  controllers: [EquipmentsController],
  providers: [
    EquipmentsService,
    {
      provide: TypeOrmEquipmentRepository,
      useFactory: (dataSource: DataSource) => {
        return new TypeOrmEquipmentRepository(
          dataSource.getRepository(EquipmentSchema),
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
        equipmentRepo: IEquipmentRepository,
        departmentRepo: IDepartmentRepository,
      ) => {
        return new CreateEquipmentUseCase(equipmentRepo, departmentRepo);
      },
      inject: [TypeOrmEquipmentRepository, TypeOrmDepartmentRepository],
    },
    {
      provide: FindAllEquipmentsUseCase,
      useFactory: (equipmentRepo: IEquipmentRepository) => {
        return new FindAllEquipmentsUseCase(equipmentRepo);
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
      provide: updateEquipmentDepartmentUseCase,
      useFactory: (
        equipmentRepo: IEquipmentRepository,
        departmentRepo: IDepartmentRepository,
      ) => {
        return new updateEquipmentDepartmentUseCase(
          equipmentRepo,
          departmentRepo,
        );
      },
      inject: [TypeOrmEquipmentRepository, TypeOrmDepartmentRepository],
    },
  ],
})
export class EquipmentsModule {}
