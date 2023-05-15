import { Module } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { IDepartmentRepository } from 'src/domain/repository/department-repository';
import { IUserRepository } from 'src/domain/repository/user-repository';
import { CreateUserUseCase } from 'src/domain/use-cases/user/create-user';
import { EditUserUseCase } from 'src/domain/use-cases/user/edit-user';
import { FetchAllUsersUseCase } from 'src/domain/use-cases/user/fetch-all-users';
import { FetchByDepartmentIdUseCase } from 'src/domain/use-cases/user/fetch-by-department-id';
import { FindUserByUserNameUseCase } from 'src/domain/use-cases/user/find-user-by-user-name';
import { DepartmentsSchema } from 'src/infra/repository/typeorm/entities/departments.schema';
import { EquipmentsUserSchema } from 'src/infra/repository/typeorm/entities/equipments-user.schema';
import { UsersSchema } from 'src/infra/repository/typeorm/entities/users.schema';
import { TypeOrmDepartmentRepository } from 'src/infra/repository/typeorm/typeorm-department-repository';
import { TypeOrmUserAssignmentsRepository } from 'src/infra/repository/typeorm/typeorm-user-assignments-repository';
import { TypeOrmUserRepository } from 'src/infra/repository/typeorm/typeorm-user-repository';
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
      useFactory: (userRepo: IUserRepository, userAssignmentsRepo) => {
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
  ],
})
export class UsersModule {}
