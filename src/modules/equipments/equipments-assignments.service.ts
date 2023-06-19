import { RemoveEquipmentAssignmentUseCase } from '@/domain/inventory/use-cases/remove-equipment-assignment';
import { RemoveUserAssignmentsUseCase } from '@/domain/inventory/use-cases/remove-user-assignments';
import { SaveUserAssignmentsUseCase } from '@/domain/inventory/use-cases/save-user-assignments';
import { Injectable } from '@nestjs/common';
import {
  ConflictException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { CreateUserAssignmentDto } from './dto/create-user-assignment.dto';

@Injectable()
export class EquipmentsAssignmentsService {
  constructor(
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
