import { IEquipmentRepository } from '@/domain/inventory/repository/equipment.repository';
import { IUserAssignmentsRepository } from '@/domain/inventory/repository/user-assignments.repository';
import { Equipment } from '../entity/equipment';
import { EquipmentNotFoundError } from './errors/equipment-not-found-error';

interface RemoveEquipmentAssignmentRequest {
  equipmentId: string;
}
interface RemoveEquipmentAssignmentResponse {
  equipment: Equipment;
}

export class RemoveEquipmentAssignmentUseCase {
  constructor(
    private userAssignmentRepository: IUserAssignmentsRepository,
    private equipmentRepository: IEquipmentRepository,
  ) {}

  async execute({
    equipmentId,
  }: RemoveEquipmentAssignmentRequest): Promise<RemoveEquipmentAssignmentResponse> {
    const equipment = await this.equipmentRepository.findById(equipmentId);

    if (!equipment) {
      throw new EquipmentNotFoundError();
    }

    await this.userAssignmentRepository.deleteByEquipmentId(equipment.id);

    equipment.status = 'pendency';

    await this.equipmentRepository.save(equipment);

    return { equipment };
  }
}
