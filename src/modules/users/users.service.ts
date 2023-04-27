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
    status,
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
        status,
      });

      return {
        user: user.props,
      };
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }
  async findAll() {
    try {
      const { users } = await this.findAllUseCase.execute();

      return {
        users: users.map((users) => {
          return users.props;
        }),
        totalCount: users.length,
      };
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async findByUserName(userName: string) {
    try {
      const { user } = await this.findByIdUseCase.execute(userName);

      return {
        user: user.props,
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

  async updateDepartment(userName: string, department: string) {
    try {
      const { updatedUser } = await this.updateDepartmentUseCase.execute(
        userName,
        department,
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
