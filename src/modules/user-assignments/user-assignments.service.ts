import { Injectable } from '@nestjs/common';
import {
  ConflictException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { FindAllUsersAssignmentsUseCase } from 'src/domain/use-cases/user-assignments/find-all-users-assignments';
import { FindAssignmentByEquipmentIdUseCase } from 'src/domain/use-cases/user-assignments/find-assignment-by-equipment-id';
import { FindAssignmentsByUserNameUseCase } from 'src/domain/use-cases/user-assignments/find-assignments-by-user-name';
import { SaveUserAssignmentsUseCase } from 'src/domain/use-cases/user-assignments/save-user-assignments';
import { CreateUserAssignmentDto } from './dto/create-user-assignment.dto';

@Injectable()
export class UserAssignmentsService {
  constructor(
    private findAllUseCase: FindAllUsersAssignmentsUseCase,
    private FindByEquipmentIdUseCase: FindAssignmentByEquipmentIdUseCase,
    private FindByUserNameUseCase: FindAssignmentsByUserNameUseCase,
    private SaveUserAssignmentUseCase: SaveUserAssignmentsUseCase,
  ) {}

  async save({ user_name, equipment_id }: CreateUserAssignmentDto) {
    try {
      return this.SaveUserAssignmentUseCase.execute(user_name, equipment_id);
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }

  async findAll() {
    try {
      return this.findAllUseCase.execute();
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async findByEquipmentId(id: string) {
    try {
      return this.FindByEquipmentIdUseCase.execute(id);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
  async findByUserName(id: string) {
    try {
      return this.FindByUserNameUseCase.execute(id);
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  /* async update(id: number, updateUserAssignmentDto: UpdateUserAssignmentDto) {
    return `This action updates a #${id} userAssignment`;
  } */
  /* 
  remove(id: number) {
    return `This action removes a #${id} userAssignment`;
  } */
}
