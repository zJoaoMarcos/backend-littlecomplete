import { IEquipmentRepository } from '@/domain/inventory/repository/equipment.repository';
import { Equipment } from '../../entity/equipment';
import { EquipmentNotFoundError } from '../errors/equipment-not-found-error';

interface FindEquipmentByIdRequest {
  id: string;
}

interface FindEquipmentByIdOutput {
  equipment: Equipment;
}

export class FindEquipmentByIdUseCase {
  constructor(private equipmentsRepository: IEquipmentRepository) {}

  async execute({
    id,
  }: FindEquipmentByIdRequest): Promise<FindEquipmentByIdOutput> {
    const equipment = await this.equipmentsRepository.findById(id);

    if (!equipment) {
      throw new EquipmentNotFoundError();
    }

    return {
      equipment,
    };
  }
}
