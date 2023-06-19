import { IUserRepository } from '@/domain/employees/repository/user.repository';
import { UserNotFoundError } from '@/domain/employees/use-cases/errors/user-not-found';
import { UserAssignments } from '@/domain/inventory/entity/user-assignments';
import { IEquipmentRepository } from '@/domain/inventory/repository/equipment.repository';
import { IUserAssignmentsRepository } from '@/domain/inventory/repository/user-assignments.repository';
import { EquipmentIsUnavailableError } from '@/domain/inventory/use-cases/errors/equipment-is-unavailable-error';
import { AssignmentNotAllowedError } from '../errors/assignment-not-allowed-error';
import { EquipmentNotFoundError } from '../errors/equipment-not-found-error';

interface SaveUserAssignmentRequest {
  user_id: string;
  equipment_id: string;
}

interface SaveUserAssignmentsResponse {
  userAssignments: UserAssignments;
}

export class SaveUserAssignmentsUseCase {
  constructor(
    private userAssignmentsRepository: IUserAssignmentsRepository,
    private userRepository: IUserRepository,
    private equipmentRepository: IEquipmentRepository,
  ) {}

  async execute({
    user_id,
    equipment_id,
  }: SaveUserAssignmentRequest): Promise<SaveUserAssignmentsResponse> {
    const user = await this.userRepository.findByUserName(user_id);

    if (!user) {
      throw new UserNotFoundError();
    }

    const notAllowedStatus = ['pendency', 'disabled'];
    const userStatusIsNotAllowed = notAllowedStatus.includes(user.status);

    if (userStatusIsNotAllowed) {
      throw new AssignmentNotAllowedError();
    }

    const equipment = await this.equipmentRepository.findById(equipment_id);

    if (!equipment) {
      throw new EquipmentNotFoundError();
    }

    if (equipment.status.trim() !== 'available') {
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

    return {
      userAssignments,
    };
  }
}
