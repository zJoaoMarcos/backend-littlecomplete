import { FindAssignmentByEquipmentIdUseCase } from '@/domain/inventory/use-cases/user-assignments/find-assignment-by-equipment-id';
import { FindAssignmentsByUserNameUseCase } from '@/domain/inventory/use-cases/user-assignments/find-assignments-by-user-name';
import { RemoveEquipmentAssignmentUseCase } from '@/domain/inventory/use-cases/user-assignments/remove-equipment-assignment';
import { RemoveUserAssignmentsUseCase } from '@/domain/inventory/use-cases/user-assignments/remove-user-assignments';
import { SaveUserAssignmentsUseCase } from '@/domain/inventory/use-cases/user-assignments/save-user-assignments';
import { Injectable } from '@nestjs/common';
import {
  ConflictException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { CreateUserAssignmentDto } from './dto/create-user-assignment.dto';

@Injectable()
export class UserAssignmentsService {
  constructor(
    private FindByEquipmentIdUseCase: FindAssignmentByEquipmentIdUseCase,
    private FindByUserNameUseCase: FindAssignmentsByUserNameUseCase,
    private SaveUserAssignmentUseCase: SaveUserAssignmentsUseCase,
    private removeEquipmentAssignmentUseCase: RemoveEquipmentAssignmentUseCase,
    private removeUserAssignmentsUseCase: RemoveUserAssignmentsUseCase,
  ) {}

  async create(createUserAssignmentDto: CreateUserAssignmentDto) {
    try {
      const { userAssignments } = await this.SaveUserAssignmentUseCase.execute(
        createUserAssignmentDto,
      );

      return userAssignments.props;
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }

  async findByEquipmentId(id: string) {
    try {
      const { user } = await this.FindByEquipmentIdUseCase.execute({ id });

      return {
        user: user.props,
      };
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async findByUserName(id: string) {
    try {
      const { equipments } = await this.FindByUserNameUseCase.execute({
        userName: id,
      });

      return {
        equipments: equipments.map((equipment) => {
          return equipment.props;
        }),
      };
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async removeEquipmentAssignment(equipmentId: string) {
    try {
      return this.removeEquipmentAssignmentUseCase.execute({ equipmentId });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async removeAllUserAssignments(username: string) {
    try {
      return this.removeUserAssignmentsUseCase.execute({ username });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
}
