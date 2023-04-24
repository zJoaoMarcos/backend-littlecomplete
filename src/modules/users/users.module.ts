import { Module } from '@nestjs/common';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { IDepartmentRepository } from 'src/domain/repository/department-repository';
import { IUserRepository } from 'src/domain/repository/user-repository';
import { AssignTelephoneForUserUseCase } from 'src/domain/use-cases/user/assign-telephone-for-user';
import { CreateUserUseCase } from 'src/domain/use-cases/user/create-user';
import { FindAllUsersUseCase } from 'src/domain/use-cases/user/find-all-users';
import { FindUserByUserNameUseCase } from 'src/domain/use-cases/user/find-user-by-user-name';
import { UpdateUserDepartementUseCase } from 'src/domain/use-cases/user/update-user-department';
import { UpdateUserTitleUseCase } from 'src/domain/use-cases/user/update-user-title';
import { DepartmentSchema } from 'src/infra/repository/typeorm/entities/department.schema';
import { UserSchema } from 'src/infra/repository/typeorm/entities/user.schema';
import { TypeOrmDepartmentRepository } from 'src/infra/repository/typeorm/typeorm-department-repository';
import { TypeOrmUserRepository } from 'src/infra/repository/typeorm/typeorm-user-repository';
import { DataSource } from 'typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema, DepartmentSchema])],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: TypeOrmUserRepository,
      useFactory: (dataSource: DataSource) => {
        return new TypeOrmUserRepository(dataSource.getRepository(UserSchema));
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
      provide: CreateUserUseCase,
      useFactory: (
        equipmentRepo: IUserRepository,
        departmentRepo: IDepartmentRepository,
      ) => {
        return new CreateUserUseCase(equipmentRepo, departmentRepo);
      },
      inject: [TypeOrmUserRepository, TypeOrmDepartmentRepository],
    },
    {
      provide: FindAllUsersUseCase,
      useFactory: (userRepo: IUserRepository) => {
        return new FindAllUsersUseCase(userRepo);
      },
      inject: [TypeOrmUserRepository],
    },
    {
      provide: FindUserByUserNameUseCase,
      useFactory: (userRepo: IUserRepository) => {
        return new FindUserByUserNameUseCase(userRepo);
      },
      inject: [TypeOrmUserRepository],
    },
    {
      provide: UpdateUserDepartementUseCase,
      useFactory: (
        userRepo: IUserRepository,
        departmentRepo: IDepartmentRepository,
      ) => {
        return new UpdateUserDepartementUseCase(userRepo, departmentRepo);
      },
      inject: [TypeOrmUserRepository, TypeOrmDepartmentRepository],
    },
    {
      provide: UpdateUserTitleUseCase,
      useFactory: (userRepo: IUserRepository) => {
        return new UpdateUserTitleUseCase(userRepo);
      },
      inject: [TypeOrmUserRepository],
    },
    {
      provide: AssignTelephoneForUserUseCase,
      useFactory: (userRepo: IUserRepository) => {
        return new AssignTelephoneForUserUseCase(userRepo);
      },
      inject: [TypeOrmUserRepository],
    },
  ],
})
export class UsersModule {}
