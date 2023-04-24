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

  create({
    user_name,
    complete_name,
    title,
    department_id,
    smtp,
    direct_boss,
    telephone,
    admission_date,
    demission_date,
    status,
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
        demission_date,
        status,
      });
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }

  findAll() {
    try {
      return this.findAllUseCase.execute();
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  findByUserName(userName: string) {
    try {
      return this.findByIdUseCase.execute(userName);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  updateTitle(userName: string, title: string) {
    try {
      return this.updateTitleUseCase.execute(userName, title);
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }

  updateDepartment(userName: string, department: string) {
    try {
      return this.updateDepartmentUseCase.execute(userName, department);
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }

  assignTelephone(userName: string, telephone: number) {
    try {
      return this.assignTelephoneUseCase.execute(userName, telephone);
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }
}
