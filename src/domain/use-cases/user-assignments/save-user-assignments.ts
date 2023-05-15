/* eslint-disable @typescript-eslint/ban-types */
import { UserAssignments } from '../../../domain/entity/user-assignments';
import { IEquipmentRepository } from '../../../domain/repository/equipment-repository';
import { IUserAssignmentsRepository } from '../../../domain/repository/user-assignments-repository';
import { IUserRepository } from '../../../domain/repository/user-repository';
import { EquipmentNotFoundError } from '../errors/equipment-not-found-error';
import { UserNotFoundError } from '../errors/user-not-found';

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

    const equipment = await this.equipmentRepository.findById(equipment_id);

    if (!equipment) {
      throw new EquipmentNotFoundError();
    }

    const userAssignments = UserAssignments.create({
      user,
      equipment,
    });

    await this.userAssignmentsRepository.save(userAssignments);

    return {};
  }
}

type SaveUserAssignmentInput = {
  user_id: string;
  equipment_id: string;
};

type SaveUserAssignmentsOutput = {};
