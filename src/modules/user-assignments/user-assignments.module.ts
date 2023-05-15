import { Module } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { IEquipmentRepository } from 'src/domain/repository/equipment-repository';
import { IUserAssignmentsRepository } from 'src/domain/repository/user-assignments-repository';
import { IUserRepository } from 'src/domain/repository/user-repository';
import { FetchAllUsersAssignmentsUseCase } from 'src/domain/use-cases/user-assignments/fetch-all-users-assignments';
import { FindAssignmentByEquipmentIdUseCase } from 'src/domain/use-cases/user-assignments/find-assignment-by-equipment-id';
import { FindAssignmentsByUserNameUseCase } from 'src/domain/use-cases/user-assignments/find-assignments-by-user-name';
import { SaveUserAssignmentsUseCase } from 'src/domain/use-cases/user-assignments/save-user-assignments';
import { EquipmentsUserSchema } from 'src/infra/repository/typeorm/entities/equipments-user.schema';
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
      provide: FetchAllUsersAssignmentsUseCase,
      useFactory: (userAssignmentsRepo: IUserAssignmentsRepository) => {
        return new FetchAllUsersAssignmentsUseCase(userAssignmentsRepo);
      },
      inject: [TypeOrmUserAssignmentsRepository],
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
  ],
})
export class UserAssignmentsModule {}
