import { Module } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

// Repositories
import { IAuditoryRepository } from '@/domain/auditory/repository/auditory.repository';
import { IDepartmentRepository } from '@/domain/employees/repository/department.repository';
import { IUserRepository } from '@/domain/employees/repository/user.repository';
import { IEquipmentRepository } from '@/domain/inventory/repository/equipment.repository';
import { IUserAssignmentsRepository } from '@/domain/inventory/repository/user-assignments.repository';
import { TypeOrmAuditoryRepository } from '@/infra/repository/typeorm/typeorm-auditory-repository';
import { TypeOrmDepartmentRepository } from '@/infra/repository/typeorm/typeorm-department-repository';
import { TypeOrmEquipmentRepository } from '@/infra/repository/typeorm/typeorm-equipment-repository';
import { TypeOrmUserAssignmentsRepository } from '@/infra/repository/typeorm/typeorm-user-assignments-repository';
import { TypeOrmUserRepository } from '@/infra/repository/typeorm/typeorm-user-repository';

// UseCases
import { CreateEquipmentUseCase } from '@/domain/inventory/use-cases/create-equipment';
import { EditEquipmentUseCase } from '@/domain/inventory/use-cases/edit-equipment';
import { FetchAllEquipmentsUseCase } from '@/domain/inventory/use-cases/fetch-all-equipments';
import { FindEquipmentByIdUseCase } from '@/domain/inventory/use-cases/find-equipment-by-id';
import { RemoveAllUserAssignmentsUseCase } from '@/domain/inventory/use-cases/remove-all-user-assignments';
import { RemoveEquipmentAssignmentUseCase } from '@/domain/inventory/use-cases/remove-equipment-assignment';
import { SaveUserAssignmentsUseCase } from '@/domain/inventory/use-cases/save-user-assignments';
import { UpdateEquipmentStatusUseCase } from '@/domain/inventory/use-cases/update-equipment-status';

// Schemas
import { AuditorySchema } from '@/infra/repository/typeorm/entities/auditory.schema';
import { DepartmentsSchema } from '@/infra/repository/typeorm/entities/departments.schema';
import { EquipmentsUserSchema } from '@/infra/repository/typeorm/entities/equipments-user.schema';
import { EquipmentsSchema } from '@/infra/repository/typeorm/entities/equipments.schema';
import { UsersSchema } from '@/infra/repository/typeorm/entities/users.schema';

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
    {
      provide: TypeOrmAuditoryRepository,
      useFactory: (dataSource: DataSource) => {
        return new TypeOrmAuditoryRepository(
          dataSource.getRepository(AuditorySchema),
        );
      },
      inject: [getDataSourceToken()],
    },

    // Equipments
    {
      provide: CreateEquipmentUseCase,
      useFactory: (
        equipmentRepo: IEquipmentRepository,
        departmentRepo: IDepartmentRepository,
        auditoryRepo: IAuditoryRepository,
      ) => {
        return new CreateEquipmentUseCase(
          equipmentRepo,
          departmentRepo,
          auditoryRepo,
        );
      },
      inject: [
        TypeOrmEquipmentRepository,
        TypeOrmDepartmentRepository,
        TypeOrmAuditoryRepository,
      ],
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
      useFactory: (
        equipmentRepo: IEquipmentRepository,
        userAssignmentsRepo: IUserAssignmentsRepository,
      ) => {
        return new FindEquipmentByIdUseCase(equipmentRepo, userAssignmentsRepo);
      },
      inject: [TypeOrmEquipmentRepository, TypeOrmUserAssignmentsRepository],
    },

    {
      provide: EditEquipmentUseCase,
      useFactory: (
        equipmentRepo: IEquipmentRepository,
        departmentRepo: IDepartmentRepository,
        auditoryRepo: IAuditoryRepository,
      ) => {
        return new EditEquipmentUseCase(
          equipmentRepo,
          departmentRepo,
          auditoryRepo,
        );
      },
      inject: [
        TypeOrmEquipmentRepository,
        TypeOrmDepartmentRepository,
        TypeOrmAuditoryRepository,
      ],
    },

    {
      provide: UpdateEquipmentStatusUseCase,
      useFactory: (
        equipmentRepo: IEquipmentRepository,
        auditoryRepo: IAuditoryRepository,
      ) => {
        return new UpdateEquipmentStatusUseCase(equipmentRepo, auditoryRepo);
      },
      inject: [TypeOrmEquipmentRepository, TypeOrmAuditoryRepository],
    },

    // Equipments Assignments
    {
      provide: SaveUserAssignmentsUseCase,
      useFactory: (
        userAssignmentsRepo: IUserAssignmentsRepository,
        userRepo: IUserRepository,
        equipmentRepo: IEquipmentRepository,
        auditoryRepo: IAuditoryRepository,
      ) => {
        return new SaveUserAssignmentsUseCase(
          userAssignmentsRepo,
          userRepo,
          equipmentRepo,
          auditoryRepo,
        );
      },
      inject: [
        TypeOrmUserAssignmentsRepository,
        TypeOrmUserRepository,
        TypeOrmEquipmentRepository,
        TypeOrmAuditoryRepository,
      ],
    },

    {
      provide: RemoveEquipmentAssignmentUseCase,
      useFactory: (
        userAssignmentsRepo: IUserAssignmentsRepository,
        equipmentRepo: IEquipmentRepository,
        auditoryRepo: IAuditoryRepository,
      ) => {
        return new RemoveEquipmentAssignmentUseCase(
          userAssignmentsRepo,
          equipmentRepo,
          auditoryRepo,
        );
      },
      inject: [
        TypeOrmUserAssignmentsRepository,
        TypeOrmEquipmentRepository,
        TypeOrmAuditoryRepository,
      ],
    },

    {
      provide: RemoveAllUserAssignmentsUseCase,
      useFactory: (
        userAssignmentsRepo: IUserAssignmentsRepository,
        userRepo: IUserRepository,
        equipmentRepo: IEquipmentRepository,
      ) => {
        return new RemoveAllUserAssignmentsUseCase(
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
