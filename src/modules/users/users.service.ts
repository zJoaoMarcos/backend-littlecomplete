import { Injectable } from '@nestjs/common';
import {
  ConflictException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { CreateUserUseCase } from 'src/domain/use-cases/user/create-user';
import { EditUserUseCase } from 'src/domain/use-cases/user/edit-user';
import { FetchAllUsersUseCase } from 'src/domain/use-cases/user/fetch-all-users';
import { FetchByDepartmentIdUseCase } from 'src/domain/use-cases/user/fetch-by-department-id';
import { FindUserByUserNameUseCase } from 'src/domain/use-cases/user/find-user-by-user-name';
import { UpdateUserStatusUseCase } from 'src/domain/use-cases/user/update-user-status';
import { FindManyParamsDto } from '../shared/find-many-params.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private createUseCase: CreateUserUseCase,
    private findAllUseCase: FetchAllUsersUseCase,
    private findByDepartmentIdUseCase: FetchByDepartmentIdUseCase,
    private findByIdUseCase: FindUserByUserNameUseCase,
    private updateUsecase: EditUserUseCase,
    private updateUserStatusUseCase: UpdateUserStatusUseCase,
  ) {}

  async create({
    user_name,
    complete_name,
    title,
    department_id,
    smtp,
    direct_boss,
    telephone,
    admission_date,
  }: CreateUserDto) {
    try {
      return this.createUseCase.execute({
        user_name,
        complete_name,
        title,
        department_id,
        smtp,
        direct_boss,
        telephone,
        admission_date,
      });
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }

  async findAll(params: FindManyParamsDto) {
    try {
      const { users, totalCount } = await this.findAllUseCase.execute({
        params,
      });
      return {
        totalCount: totalCount,
        users: users.map((users) => {
          return users.props;
        }),
      };
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async findByUserName(userName: string) {
    try {
      const { user, equipments } = await this.findByIdUseCase.execute(userName);

      return {
        user: user.props,
        equipments: equipments.map((equip) => {
          return equip.props;
        }),
      };
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async findByDepartmentId(departmentId: number, skip?: number, take?: number) {
    const { users, totalCount } = await this.findByDepartmentIdUseCase.execute({
      departmentId,
      skip,
      take,
    });

    return {
      totalCount,
      users: users.map((users) => {
        return users.props;
      }),
    };
  }

  async updateUser(id: string, user: UpdateUserDto) {
    try {
      await this.updateUsecase.execute({ user_name: id, ...user });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async updateStatus(id: string, status: string) {
    try {
      await this.updateUserStatusUseCase.execute({ username: id, status });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
