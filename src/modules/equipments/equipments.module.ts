import { IDepartmentRepository } from '@/domain/employees/repository/department.repository';
import { IEquipmentRepository } from '@/domain/inventory/repository/equipment.repository';
import { CreateEquipmentUseCase } from '@/domain/inventory/use-cases/equipment/create-equipment';
import { EditEquipmentUseCase } from '@/domain/inventory/use-cases/equipment/edit-equipment';
import { FetchAllEquipmentsUseCase } from '@/domain/inventory/use-cases/equipment/fetch-all-equipments';
import { FetchByDepartmentIdUseCase } from '@/domain/inventory/use-cases/equipment/fetch-by-department-id';
import { FindEquipmentByIdUseCase } from '@/domain/inventory/use-cases/equipment/find-equipment-by-id';
import { UpdateStatusUseCase } from '@/domain/inventory/use-cases/equipment/update-status';
import { DepartmentsSchema } from '@/infra/repository/typeorm/entities/departments.schema';
import { EquipmentsSchema } from '@/infra/repository/typeorm/entities/equipments.schema';
import { TypeOrmDepartmentRepository } from '@/infra/repository/typeorm/typeorm-department-repository';
import { TypeOrmEquipmentRepository } from '@/infra/repository/typeorm/typeorm-equipment-repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
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
      provide: FetchByDepartmentIdUseCase,
      useFactory: (
        equipmentRepo: IEquipmentRepository,
        departmentRepo: IDepartmentRepository,
      ) => {
        return new FetchByDepartmentIdUseCase(equipmentRepo, departmentRepo);
      },
      inject: [TypeOrmEquipmentRepository, TypeOrmDepartmentRepository],
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
    {
      provide: UpdateStatusUseCase,
      useFactory: (equipmentRepo: IEquipmentRepository) => {
        return new UpdateStatusUseCase(equipmentRepo);
      },
      inject: [TypeOrmEquipmentRepository],
    },
  ],
})
export class EquipmentsModule {}
