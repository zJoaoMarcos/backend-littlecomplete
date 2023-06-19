import { IEquipmentRepository } from '@/domain/inventory/repository/equipment.repository';
import { Equipment } from '../entity/equipment';
import { IUserAssignmentsRepository } from '../repository/user-assignments.repository';
import { EquipmentNotFoundError } from './errors/equipment-not-found-error';
import { InvalidStatusRequestError } from './errors/invalid-status-request-error';

interface UpdateStatusRequest {
  equipment_id: string;
  status: string;
}

interface UpdateStatusOutput {
  equipment: Equipment;
}

export class UpdateEquipmentStatusUseCase {
  constructor(
    private equipmentRepository: IEquipmentRepository,
    private userAssignmentsRepository: IUserAssignmentsRepository,
  ) {}

  async execute({
    equipment_id,
    status,
  }: UpdateStatusRequest): Promise<UpdateStatusOutput> {
    const equipment = await this.equipmentRepository.findById(equipment_id);

    if (!equipment) {
      throw new EquipmentNotFoundError();
    }

    const equipmentIsInUse = equipment.status === 'in use';

    if (status === 'maintenance' && equipmentIsInUse) {
      equipment.status = status;

      await this.equipmentRepository.save(equipment);
      return { equipment };
    }

    if (status === 'available' && !equipmentIsInUse) {
      equipment.status = status;

      await this.equipmentRepository.save(equipment);
      return { equipment };
    }

    if (status === 'disabled' && !equipmentIsInUse) {
      equipment.status = status;

      await this.equipmentRepository.save(equipment);
      return { equipment };
    }

    throw new InvalidStatusRequestError();
  }
}
