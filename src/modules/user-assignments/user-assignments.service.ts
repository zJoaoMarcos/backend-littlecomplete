import { Injectable } from '@nestjs/common';
import {
  ConflictException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { FetchAllUsersAssignmentsUseCase } from 'src/domain/use-cases/user-assignments/fetch-all-users-assignments';
import { FindAssignmentByEquipmentIdUseCase } from 'src/domain/use-cases/user-assignments/find-assignment-by-equipment-id';
import { FindAssignmentsByUserNameUseCase } from 'src/domain/use-cases/user-assignments/find-assignments-by-user-name';
import { RemoveEquipmentAssignmentUseCase } from 'src/domain/use-cases/user-assignments/remove-equipment-assignment';
import { RemoveUserAssignmentsUseCase } from 'src/domain/use-cases/user-assignments/remove-user-assignments';
import { SaveUserAssignmentsUseCase } from 'src/domain/use-cases/user-assignments/save-user-assignments';
import { CreateUserAssignmentDto } from './dto/create-user-assignment.dto';

@Injectable()
export class UserAssignmentsService {
  constructor(
    private findAllUseCase: FetchAllUsersAssignmentsUseCase,
    private FindByEquipmentIdUseCase: FindAssignmentByEquipmentIdUseCase,
    private FindByUserNameUseCase: FindAssignmentsByUserNameUseCase,
    private SaveUserAssignmentUseCase: SaveUserAssignmentsUseCase,
    private removeEquipmentAssignmentUseCase: RemoveEquipmentAssignmentUseCase,
    private removeUserAssignmentsUseCase: RemoveUserAssignmentsUseCase,
  ) {}

  async create(createUserAssignmentDto: CreateUserAssignmentDto) {
    try {
      return this.SaveUserAssignmentUseCase.execute(createUserAssignmentDto);
    } catch (err) {
      throw new ConflictException(err.message);
    }
  }

  async findAll() {
    try {
      const { userAssignments } = await this.findAllUseCase.execute();
      return {
        userAssignments: userAssignments.map((assignments) => {
          return {
            assignments: {
              user: assignments.props.user.props,
              equipment: assignments.props.equipment.props,
            },
          };
        }),
      };
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async findByEquipmentId(id: string) {
    try {
      const { user } = await this.FindByEquipmentIdUseCase.execute(id);

      return {
        user: user.props,
      };
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async findByUserName(id: string) {
    try {
      const { equipments } = await this.FindByUserNameUseCase.execute(id);

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
