import { Injectable } from '@nestjs/common';
import {
  ConflictException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { AssignTelephoneForUserUseCase } from 'src/domain/use-cases/user/assign-telephone-for-user';
import { CreateUserUseCase } from 'src/domain/use-cases/user/create-user';
import { FindAllUsersUseCase } from 'src/domain/use-cases/user/find-all-users';
import { FindUserByUserNameUseCase } from 'src/domain/use-cases/user/find-user-by-user-name';
import { UpdateUserDepartementUseCase } from 'src/domain/use-cases/user/update-user-department';
import { UpdateUserStatusUseCase } from 'src/domain/use-cases/user/update-user-status';
import { UpdateUserTitleUseCase } from 'src/domain/use-cases/user/update-user-title';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private createUseCase: CreateUserUseCase,
    private findAllUseCase: FindAllUsersUseCase,
    private findByIdUseCase: FindUserByUserNameUseCase,
    private updateTitleUseCase: UpdateUserTitleUseCase,
    private updateDepartmentUseCase: UpdateUserDepartementUseCase,
    private updateStatusUseCase: UpdateUserStatusUseCase,
    private assignTelephoneUseCase: AssignTelephoneForUserUseCase,
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
      const { user } = await this.createUseCase.execute({
        user_name,
        complete_name,
        title,
        department_id,
        smtp,
        direct_boss,
        telephone,
        admission_date,
      });

      return {
        user: user.props,
      };
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }
  async findAll(skip: number, take: number, where: string) {
    try {
      const { users, totalCount } = await this.findAllUseCase.execute({
        skip,
        take,
        where,
      });

      return {
        users: users.map((users) => {
          return users.props;
        }),
        totalCount: totalCount,
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

  async updateTitle(userName: string, title: string) {
    try {
      const { updatedUser } = await this.updateTitleUseCase.execute(
        userName,
        title,
      );

      return {
        user: updatedUser.props,
      };
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }

  async updateDepartment(
    userName: string,
    department_id: string,
    title: string,
    direct_boss: string,
  ) {
    try {
      const { updatedUser } = await this.updateDepartmentUseCase.execute(
        userName,
        department_id,
        title,
        direct_boss,
      );
      return {
        user: updatedUser.props,
      };
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }

  async updateStatus(userName: string, status: string) {
    try {
      const { updatedUser } = await this.updateStatusUseCase.execute(
        userName,
        status,
      );
      return {
        user: updatedUser.props,
      };
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }

  async assignTelephone(userName: string, telephone: number) {
    try {
      const { updatedUser } = await this.assignTelephoneUseCase.execute(
        userName,
        telephone,
      );

      return {
        user: updatedUser.props,
      };
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }
}
