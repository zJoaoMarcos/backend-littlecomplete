import { Module } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { IEquipmentRepository } from 'src/domain/repository/equipment-repository';
import { IUserAssignmentsRepository } from 'src/domain/repository/user-assignments-repository';
import { IUserRepository } from 'src/domain/repository/user-repository';
import { FindAllUsersAssignmentsUseCase } from 'src/domain/use-cases/user-assignments/find-all-users-assignments';
import { FindAssignmentByEquipmentIdUseCase } from 'src/domain/use-cases/user-assignments/find-assignment-by-equipment-id';
import { FindAssignmentsByUserNameUseCase } from 'src/domain/use-cases/user-assignments/find-assignments-by-user-name';
import { SaveUserAssignmentsUseCase } from 'src/domain/use-cases/user-assignments/save-user-assignments';
import { EquipmentSchema } from 'src/infra/repository/typeorm/entities/equipments-schema';
import { EquipmentUserSchema } from 'src/infra/repository/typeorm/entities/equipments-user.schema';
import { UserSchema } from 'src/infra/repository/typeorm/entities/user.schema';
import { TypeOrmEquipmentRepository } from 'src/infra/repository/typeorm/typeorm-equipment-repository';
import { TypeOrmUserAssignmentsRepository } from 'src/infra/repository/typeorm/typeorm-user-assignments-repository';
import { TypeOrmUserRepository } from 'src/infra/repository/typeorm/typeorm-user-repository';
import { DataSource } from 'typeorm';
import { UserAssignmentsController } from './user-assignments.controller';
import { UserAssignmentsService } from './user-assignments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      EquipmentUserSchema,
      UserSchema,
      EquipmentSchema,
    ]),
  ],
  controllers: [UserAssignmentsController],
  providers: [
    UserAssignmentsService,
    {
      provide: TypeOrmUserAssignmentsRepository,
      useFactory: (dataSource: DataSource) => {
        return new TypeOrmUserAssignmentsRepository(
          dataSource.getRepository(EquipmentUserSchema),
        );
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: TypeOrmUserRepository,
      useFactory: (dataSource: DataSource) => {
        return new TypeOrmUserRepository(dataSource.getRepository(UserSchema));
      },
      inject: [getDataSourceToken()],
    },
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
      provide: FindAllUsersAssignmentsUseCase,
      useFactory: (userAssignmentsRepo: IUserAssignmentsRepository) => {
        return new FindAllUsersAssignmentsUseCase(userAssignmentsRepo);
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
