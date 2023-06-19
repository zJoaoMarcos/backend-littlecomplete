import { User } from '@/domain/employees/entity/user';
import { IUserAssignmentsRepository } from '@/domain/inventory/repository/user-assignments.repository';
import { EquipmentNotFoundError } from '../errors/equipment-not-found-error';

interface FindAssignmentByEquipmentRequest {
  id: string;
}

interface FindAssignmentByEquipmentIdResponse {
  user: User;
}

export class FindAssignmentByEquipmentIdUseCase {
  constructor(private userAssignmentsRepository: IUserAssignmentsRepository) {}

  async execute({
    id,
  }: FindAssignmentByEquipmentRequest): Promise<FindAssignmentByEquipmentIdResponse> {
    const userAssignments =
      await this.userAssignmentsRepository.findByEquipmentId(id);

    if (!userAssignments) {
      throw new EquipmentNotFoundError();
    }

    const user = userAssignments;

    return {
      user,
    };
  }
}
