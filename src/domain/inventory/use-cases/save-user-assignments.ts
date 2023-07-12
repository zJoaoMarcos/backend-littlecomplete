import { Auditory } from '@/domain/auditory/entity/auditory';
import { IAuditoryRepository } from '@/domain/auditory/repository/auditory.repository';
import { IUserRepository } from '@/domain/employees/repository/user.repository';
import { UserNotFoundError } from '@/domain/employees/use-cases/errors/user-not-found';
import { UserAssignments } from '@/domain/inventory/entity/user-assignments';
import { IEquipmentRepository } from '@/domain/inventory/repository/equipment.repository';
import { IUserAssignmentsRepository } from '@/domain/inventory/repository/user-assignments.repository';
import { EquipmentIsUnavailableError } from '@/domain/inventory/use-cases/errors/equipment-is-unavailable-error';
import { randomUUID } from 'crypto';
import { AssignmentNotAllowedError } from './errors/assignment-not-allowed-error';
import { EquipmentNotFoundError } from './errors/equipment-not-found-error';

interface SaveUserAssignmentRequest {
  userId: string;
  equipmentId: string;
  createdBy: string;
}

interface SaveUserAssignmentsResponse {
  userAssignments: UserAssignments;
}

export class SaveUserAssignmentsUseCase {
  constructor(
    private userAssignmentsRepository: IUserAssignmentsRepository,
    private userRepository: IUserRepository,
    private equipmentRepository: IEquipmentRepository,
    private auditoryRepository: IAuditoryRepository,
  ) {}

  async execute({
    userId,
    equipmentId,
    createdBy,
  }: SaveUserAssignmentRequest): Promise<SaveUserAssignmentsResponse> {
    const user = await this.userRepository.findByUserName(userId);

    if (!user) {
      throw new UserNotFoundError();
    }

    const notAllowedStatus = ['pendency', 'disabled'];
    const isUserWithDisallowedStatus = notAllowedStatus.includes(user.status);
    if (isUserWithDisallowedStatus) {
      throw new AssignmentNotAllowedError();
    }

    const equipment = await this.equipmentRepository.findById(equipmentId);
    if (!equipment) {
      throw new EquipmentNotFoundError();
    }

    if (equipment.status !== 'available') {
      throw new EquipmentIsUnavailableError();
    }

    const userAssignments = UserAssignments.create({
      user,
      equipment,
    });
    await this.userAssignmentsRepository.save(userAssignments);

    const isTheSameDepartment = user.department_id === equipment.departmentId;

    if (!isTheSameDepartment) {
      equipment.status = 'borrowed';
    }

    equipment.status = 'in use';

    await this.equipmentRepository.save(equipment);

    const action = Auditory.create({
      id: randomUUID(),
      type: 'POST',
      module: 'Inventory',
      form: 'assign-equipment',
      description: `the equipment: ${JSON.stringify(
        equipment.props,
      )} has been assing to employee: ${JSON.stringify(user.props)}`,
      createdBy,
      createdAt: new Date(),
    });

    await this.auditoryRepository.create(action);

    return {
      userAssignments,
    };
  }
}
