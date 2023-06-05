import { IUserRepository } from '@/domain/employees/repository/user.repository';
import { IEquipmentRepository } from '@/domain/inventory/repository/equipment.repository';
import { IUserAssignmentsRepository } from '@/domain/inventory/repository/user-assignments.repository';
import { FindAssignmentByEquipmentIdUseCase } from '@/domain/inventory/use-cases/user-assignments/find-assignment-by-equipment-id';
import { FindAssignmentsByUserNameUseCase } from '@/domain/inventory/use-cases/user-assignments/find-assignments-by-user-name';
import { RemoveEquipmentAssignmentUseCase } from '@/domain/inventory/use-cases/user-assignments/remove-equipment-assignment';
import { RemoveUserAssignmentsUseCase } from '@/domain/inventory/use-cases/user-assignments/remove-user-assignments';
import { SaveUserAssignmentsUseCase } from '@/domain/inventory/use-cases/user-assignments/save-user-assignments';
import { EquipmentsUserSchema } from '@/infra/repository/typeorm/entities/equipments-user.schema';
import { Module } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { EquipmentsSchema } from 'src/infra/repository/typeorm/entities/equipments.schema';
import { UsersSchema } from 'src/infra/repository/typeorm/entities/users.schema';
import { TypeOrmEquipmentRepository } from 'src/infra/repository/typeorm/typeorm-equipment-repository';
import { TypeOrmUserAssignmentsRepository } from 'src/infra/repository/typeorm/typeorm-user-assignments-repository';
import { TypeOrmUserRepository } from 'src/infra/repository/typeorm/typeorm-user-repository';
import { DataSource } from 'typeorm';
import { UserAssignmentsController } from './user-assignments.controller';
import { UserAssignmentsService } from './user-assignments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EquipmentsUserSchema,
      UsersSchema,
      EquipmentsSchema,
    ]),
  ],
  controllers: [UserAssignmentsController],
  providers: [
    UserAssignmentsService,
    {
      provide: TypeOrmUserAssignmentsRepository,
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
      provide: TypeOrmEquipmentRepository,
      useFactory: (dataSource: DataSource) => {
        return new TypeOrmEquipmentRepository(
          dataSource.getRepository(EquipmentsSchema),
        );
      },
      inject: [getDataSourceToken()],
    },
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
      provide: FindAssignmentByEquipmentIdUseCase,
      useFactory: (userAssignmentsRepo: IUserAssignmentsRepository) => {
        return new FindAssignmentByEquipmentIdUseCase(userAssignmentsRepo);
      },
      inject: [TypeOrmUserAssignmentsRepository],
    },
    {
      provide: FindAssignmentsByUserNameUseCase,
      useFactory: (userAssignmentsRepo: IUserAssignmentsRepository) => {
        return new FindAssignmentsByUserNameUseCase(userAssignmentsRepo);
      },
      inject: [TypeOrmUserAssignmentsRepository],
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
export class UserAssignmentsModule {}
