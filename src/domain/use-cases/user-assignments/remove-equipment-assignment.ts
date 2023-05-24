/* eslint-disable @typescript-eslint/ban-types */
import { IEquipmentRepository } from 'src/domain/repository/equipment-repository';
import { IUserAssignmentsRepository } from 'src/domain/repository/user-assignments-repository';
import { EquipmentNotFoundError } from '../errors/equipment-not-found-error';

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
