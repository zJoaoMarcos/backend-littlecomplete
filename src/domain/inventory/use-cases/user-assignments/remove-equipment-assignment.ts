/* eslint-disable @typescript-eslint/ban-types */
import { EquipmentNotFoundError } from '@/domain/errors/equipment-not-found-error';
import { IEquipmentRepository } from '@/domain/inventory/repository/equipment.repository';
import { IUserAssignmentsRepository } from '@/domain/inventory/repository/user-assignments.repository';

export class RemoveEquipmentAssignmentUseCase {
  constructor(
    private userAssignmentRepository: IUserAssignmentsRepository,
    private equipmentRepository: IEquipmentRepository,
  ) {}

  async execute({ equipmentId }: Request): Promise<Response> {
    const equipment = await this.equipmentRepository.findById(equipmentId);

    if (!equipment) {
      throw new EquipmentNotFoundError();
    }

    await this.userAssignmentRepository.deleteByEquipmentId(equipment.id);

    equipment.status = 'pendency';

    await this.equipmentRepository.save(equipment);

    return {};
  }
}

type Request = {
  equipmentId: string;
};

type Response = {};
