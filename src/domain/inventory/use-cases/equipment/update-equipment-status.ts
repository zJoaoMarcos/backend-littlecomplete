import { EquipmentNotFoundError } from '@/domain/errors/equipment-not-found-error';
import { IEquipmentRepository } from '@/domain/inventory/repository/equipment.repository';

export class UpdateEquipmentsStatusUseCase {
  constructor(private equipmentRepository: IEquipmentRepository) {}

  async execute({
    equipment_id,
    status,
  }: UpdateStatusInput): Promise<UpdateStatusOutput> {
    const equipment = await this.equipmentRepository.findById(equipment_id);

    if (!equipment) {
      throw new EquipmentNotFoundError();
    }

    if (status === 'available') {
      equipment.status = status;

      await this.equipmentRepository.save(equipment);
      return {};
    }

    if (status === 'disabled') {
      equipment.status = status;

      await this.equipmentRepository.save(equipment);
      return {};
    }

    if (status === 'maintenance') {
      equipment.status = status;

      await this.equipmentRepository.save(equipment);
      return {};
    }

    throw new Error('Invalid Status');
  }
}

type UpdateStatusInput = {
  equipment_id: string;
  status: string;
};

type UpdateStatusOutput = Record<string, never>;
