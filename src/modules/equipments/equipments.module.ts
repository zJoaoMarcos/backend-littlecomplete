import { Module } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import { IDepartmentRepository } from '@/domain/employees/repository/department.repository';
import { IUserRepository } from '@/domain/employees/repository/user.repository';
import { IEquipmentRepository } from '@/domain/inventory/repository/equipment.repository';
import { IUserAssignmentsRepository } from '@/domain/inventory/repository/user-assignments.repository';
import { CreateEquipmentUseCase } from '@/domain/inventory/use-cases/create-equipment';
import { EditEquipmentUseCase } from '@/domain/inventory/use-cases/edit-equipment';
import { FetchAllEquipmentsUseCase } from '@/domain/inventory/use-cases/fetch-all-equipments';
import { FindEquipmentByIdUseCase } from '@/domain/inventory/use-cases/find-equipment-by-id';
import { RemoveEquipmentAssignmentUseCase } from '@/domain/inventory/use-cases/remove-equipment-assignment';
import { RemoveUserAssignmentsUseCase } from '@/domain/inventory/use-cases/remove-user-assignments';
import { SaveUserAssignmentsUseCase } from '@/domain/inventory/use-cases/save-user-assignments';
import { UpdateEquipmentsStatusUseCase } from '@/domain/inventory/use-cases/update-equipment-status';
import { DepartmentsSchema } from '@/infra/repository/typeorm/entities/departments.schema';
import { EquipmentsUserSchema } from '@/infra/repository/typeorm/entities/equipments-user.schema';
import { EquipmentsSchema } from '@/infra/repository/typeorm/entities/equipments.schema';
import { UsersSchema } from '@/infra/repository/typeorm/entities/users.schema';
import { TypeOrmDepartmentRepository } from '@/infra/repository/typeorm/typeorm-department-repository';
import { TypeOrmEquipmentRepository } from '@/infra/repository/typeorm/typeorm-equipment-repository';
import { TypeOrmUserAssignmentsRepository } from '@/infra/repository/typeorm/typeorm-user-assignments-repository';
import { TypeOrmUserRepository } from '@/infra/repository/typeorm/typeorm-user-repository';
import { EquipmentsAssignmentsService } from './equipments-assignments.service';
import { EquipmentsController } from './equipments.controller';
import { EquipmentsService } from './equipments.service';

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentsSchema, EquipmentsSchema])],
  controllers: [EquipmentsController],
  providers: [
    EquipmentsService,
    EquipmentsAssignmentsService,

    // Repositories
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
      provide: TypeOrmUserAssignmentsRepository, // Equipment Assignments
      useFactory: (dataSource: DataSource) => {
        return new TypeOrmUserAssignmentsRepository(
          dataSource.getRepository(EquipmentsUserSchema),
        );
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: TypeOrmUserRepository,
      useFactory: (dataSource: DataSource) => {
        return new TypeOrmUserRepository(dataSource.getRepository(UsersSchema));
      },
      inject: [getDataSourceToken()],
    },

    // Equipments
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

    {
      provide: UpdateEquipmentsStatusUseCase,
      useFactory: (equipmentRepo: IEquipmentRepository) => {
        return new UpdateEquipmentsStatusUseCase(equipmentRepo);
      },
      inject: [TypeOrmEquipmentRepository],
    },

    // Equipments Assignments
    {
      provide: SaveUserAssignmentsUseCase,
      useFactory: (
        userAssignmentsRepo: IUserAssignmentsRepository,
        userRepo: IUserRepository,
        equipmentRepo: IEquipmentRepository,
      ) => {
        return new SaveUserAssignmentsUseCase(
          userAssignmentsRepo,
          userRepo,
          equipmentRepo,
        );
      },
      inject: [
        TypeOrmUserAssignmentsRepository,
        TypeOrmUserRepository,
        TypeOrmEquipmentRepository,
      ],
    },

    {
      provide: RemoveEquipmentAssignmentUseCase,
      useFactory: (
        userAssignmentsRepo: IUserAssignmentsRepository,
        equipmentRepo: IEquipmentRepository,
      ) => {
        return new RemoveEquipmentAssignmentUseCase(
          userAssignmentsRepo,
          equipmentRepo,
        );
      },
      inject: [TypeOrmUserAssignmentsRepository, TypeOrmEquipmentRepository],
    },

    {
      provide: RemoveUserAssignmentsUseCase,
      useFactory: (
        userAssignmentsRepo: IUserAssignmentsRepository,
        userRepo: IUserRepository,
        equipmentRepo: IEquipmentRepository,
      ) => {
        return new RemoveUserAssignmentsUseCase(
          userAssignmentsRepo,
          userRepo,
          equipmentRepo,
        );
      },
      inject: [
        TypeOrmUserAssignmentsRepository,
        TypeOrmUserRepository,
        TypeOrmEquipmentRepository,
      ],
    },
  ],
})
export class EquipmentsModule {}
