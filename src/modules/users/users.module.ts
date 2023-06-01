import { IDepartmentRepository } from '@/domain/employees/repository/department.repository';
import { IUserRepository } from '@/domain/employees/repository/user.repository';
import { CreateUserUseCase } from '@/domain/employees/use-cases/user/create-user';
import { EditUserUseCase } from '@/domain/employees/use-cases/user/edit-user';
import { FetchAllUsersUseCase } from '@/domain/employees/use-cases/user/fetch-all-users';
import { FetchByDepartmentIdUseCase } from '@/domain/employees/use-cases/user/fetch-by-department-id';
import { FindUserByUserNameUseCase } from '@/domain/employees/use-cases/user/find-user-by-user-name';
import { UpdateUserStatusUseCase } from '@/domain/employees/use-cases/user/update-user-status';
import { IEquipmentRepository } from '@/domain/inventory/repository/equipment.repository';
import { IUserAssignmentsRepository } from '@/domain/inventory/repository/user-assignments.repository';
import { DepartmentsSchema } from '@/infra/repository/typeorm/entities/departments.schema';
import { EquipmentsUserSchema } from '@/infra/repository/typeorm/entities/equipments-user.schema';
import { EquipmentsSchema } from '@/infra/repository/typeorm/entities/equipments.schema';
import { UsersSchema } from '@/infra/repository/typeorm/entities/users.schema';
import { TypeOrmDepartmentRepository } from '@/infra/repository/typeorm/typeorm-department-repository';
import { TypeOrmEquipmentRepository } from '@/infra/repository/typeorm/typeorm-equipment-repository';
import { TypeOrmUserAssignmentsRepository } from '@/infra/repository/typeorm/typeorm-user-assignments-repository';
import { TypeOrmUserRepository } from '@/infra/repository/typeorm/typeorm-user-repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersSchema, DepartmentsSchema])],
  controllers: [UsersController],
  providers: [
    UsersService,
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
      provide: TypeOrmDepartmentRepository,
      useFactory: (dataSource: DataSource) => {
        return new TypeOrmDepartmentRepository(
          dataSource.getRepository(DepartmentsSchema),
        );
      },
      inject: [getDataSourceToken()],
    },
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
      provide: CreateUserUseCase,
      useFactory: (
        userRepo: IUserRepository,
        departmentRepo: IDepartmentRepository,
      ) => {
        return new CreateUserUseCase(userRepo, departmentRepo);
      },
      inject: [TypeOrmUserRepository, TypeOrmDepartmentRepository],
    },
    {
      provide: FetchAllUsersUseCase,
      useFactory: (userRepo: IUserRepository) => {
        return new FetchAllUsersUseCase(userRepo);
      },
      inject: [TypeOrmUserRepository],
    },
    {
      provide: FindUserByUserNameUseCase,
      useFactory: (
        userRepo: IUserRepository,
        userAssignmentsRepo: IUserAssignmentsRepository,
      ) => {
        return new FindUserByUserNameUseCase(userRepo, userAssignmentsRepo);
      },
      inject: [TypeOrmUserRepository, TypeOrmUserAssignmentsRepository],
    },
    {
      provide: FetchByDepartmentIdUseCase,
      useFactory: (
        userRepo: IUserRepository,
        departmentRepo: IDepartmentRepository,
      ) => {
        return new FetchByDepartmentIdUseCase(userRepo, departmentRepo);
      },
      inject: [TypeOrmUserRepository, TypeOrmDepartmentRepository],
    },
    {
      provide: EditUserUseCase,
      useFactory: (
        userRepo: IUserRepository,
        departmentRepo: IDepartmentRepository,
      ) => {
        return new EditUserUseCase(userRepo, departmentRepo);
      },
      inject: [TypeOrmUserRepository, TypeOrmDepartmentRepository],
    },
    {
      provide: UpdateUserStatusUseCase,
      useFactory: (
        userRepo: IUserRepository,
        userAssignmentsRepo: IUserAssignmentsRepository,
        equipmentRepo: IEquipmentRepository,
      ) => {
        return new UpdateUserStatusUseCase(
          userRepo,
          userAssignmentsRepo,
          equipmentRepo,
        );
      },
      inject: [
        TypeOrmUserRepository,
        TypeOrmUserAssignmentsRepository,
        TypeOrmEquipmentRepository,
      ],
    },
  ],
})
export class UsersModule {}
