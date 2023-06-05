/* eslint-disable @typescript-eslint/ban-types */
import { IUserRepository } from '@/domain/employees/repository/user.repository';
import { EquipmentIsUnavailableError } from '@/domain/errors/equipment-is-unavailable-error';
import { EquipmentNotFoundError } from '@/domain/errors/equipment-not-found-error';
import { UserNotFoundError } from '@/domain/errors/user-not-found';
import { UserAssignments } from '@/domain/inventory/entity/user-assignments';
import { IEquipmentRepository } from '@/domain/inventory/repository/equipment.repository';
import { IUserAssignmentsRepository } from '@/domain/inventory/repository/user-assignments.repository';

export class SaveUserAssignmentsUseCase {
  constructor(
    private userAssignmentsRepository: IUserAssignmentsRepository,
    private userRepository: IUserRepository,
    private equipmentRepository: IEquipmentRepository,
  ) {}

  async execute({
    user_id,
    equipment_id,
  }: SaveUserAssignmentInput): Promise<SaveUserAssignmentsOutput> {
    const user = await this.userRepository.findByUserName(user_id);

    if (!user) {
      throw new UserNotFoundError();
    }

    if (user.status.trim() === ('pendency' || 'disabled')) {
      throw new Error('User is in shutdown or has a pendency');
    }

    const equipment = await this.equipmentRepository.findById(equipment_id);

    if (!equipment) {
      throw new EquipmentNotFoundError();
    }

    if (equipment.status.trim() !== 'avaliable') {
      throw new EquipmentIsUnavailableError();
    }

    const userAssignments = UserAssignments.create({
      user,
      equipment,
    });

    const isTheSameDepartment = user.department_id === equipment.departmentId;

    if (!isTheSameDepartment) {
      equipment.status = 'borrowed';
    }

    await this.userAssignmentsRepository.save(userAssignments);

    equipment.status = 'in use';

    await this.equipmentRepository.save(equipment);

    return {};
  }
}

type SaveUserAssignmentInput = {
  user_id: string;
  equipment_id: string;
};

type SaveUserAssignmentsOutput = {};
