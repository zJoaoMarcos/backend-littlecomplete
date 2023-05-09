import { Injectable } from '@nestjs/common';
import {
  ConflictException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { CreateUserUseCase } from 'src/domain/use-cases/user/create-user';
import { EditUserUseCase } from 'src/domain/use-cases/user/edit-user';
import { FindAllUsersUseCase } from 'src/domain/use-cases/user/find-all-users';
import { FindUserByUserNameUseCase } from 'src/domain/use-cases/user/find-user-by-user-name';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private createUseCase: CreateUserUseCase,
    private findAllUseCase: FindAllUsersUseCase,
    private findByIdUseCase: FindUserByUserNameUseCase,
    private updateUsecase: EditUserUseCase,
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

  async updateUser(id: string, user: UpdateUserDto) {
    try {
      await this.updateUsecase.execute({ user_name: id, ...user });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
