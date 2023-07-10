import { IEquipmentRepository } from '@/domain/inventory/repository/equipment.repository';
import { Equipment } from '../entity/equipment';
import { IUserAssignmentsRepository } from '../repository/user-assignments.repository';
import { EquipmentNotFoundError } from './errors/equipment-not-found-error';

interface FindEquipmentByIdRequest {
  id: string;
}

interface FindEquipmentByIdOutput {
  equipment: Equipment;
}

export class FindEquipmentByIdUseCase {
  constructor(
    private equipmentsRepository: IEquipmentRepository,
    private userAssignmentsRepository: IUserAssignmentsRepository,
  ) {}

  async execute({
    id,
  }: FindEquipmentByIdRequest): Promise<FindEquipmentByIdOutput> {
    const equipment = await this.equipmentsRepository.findById(id);

    if (!equipment) {
      throw new EquipmentNotFoundError();
    }

    const { user_name } =
      await this.userAssignmentsRepository.findByEquipmentId(equipment.id);

    if (user_name) {
      equipment.currentUser = user_name;
    }

    return {
      equipment,
    };
  }
}
