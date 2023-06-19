import { IUserAssignmentsRepository } from '@/domain/inventory/repository/user-assignments.repository';
import { Equipment } from '../../entity/equipment';
import { EquipmentNotFoundError } from '../errors/equipment-not-found-error';

interface FindAssignmentsByUserNameResponse {
  equipments: Equipment[];
}

interface FindAssignmentsByUserNameRequest {
  userName: string;
}

export class FindAssignmentsByUserNameUseCase {
  constructor(private userAssignmentsRepository: IUserAssignmentsRepository) {}

  async execute({
    userName,
  }: FindAssignmentsByUserNameRequest): Promise<FindAssignmentsByUserNameResponse> {
    const { equipments } = await this.userAssignmentsRepository.findByUserName(
      userName,
    );

    if (!equipments) {
      throw new EquipmentNotFoundError();
    }

    return {
      equipments,
    };
  }
}
