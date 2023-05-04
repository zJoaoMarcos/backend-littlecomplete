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
      const { userAssignments } = await this.SaveUserAssignmentUseCase.execute(
        user_name,
        equipment_id,
      );

      return {
        userAssignments: {
          user: userAssignments.props.user.props,
          equipment: userAssignments.props.equipment.props,
        },
      };
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

  /* async update(id: number, updateUserAssignmentDto: UpdateUserAssignmentDto) {
    return `This action updates a #${id} userAssignment`;
  } */
  /* 
  remove(id: number) {
    return `This action removes a #${id} userAssignment`;
  } */
}
