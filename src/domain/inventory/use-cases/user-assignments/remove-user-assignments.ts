import { IUserRepository } from '@/domain/employees/repository/user.repository';
import { UserNotFoundError } from '@/domain/employees/use-cases/errors/user-not-found';
import { IEquipmentRepository } from '@/domain/inventory/repository/equipment.repository';
import { IUserAssignmentsRepository } from '@/domain/inventory/repository/user-assignments.repository';

interface RemoveUserAssignmentsUseCaseRequest {
  username: string;
}

export class RemoveUserAssignmentsUseCase {
  constructor(
    private userAssignmentRepository: IUserAssignmentsRepository,
    private userRepository: IUserRepository,
    private equipmentsRepository: IEquipmentRepository,
  ) {}

  async execute({ username }: RemoveUserAssignmentsUseCaseRequest) {
    const user = await this.userRepository.findByUserName(username);
    if (!user) {
      throw new UserNotFoundError();
    }

    const { equipments } = await this.userAssignmentRepository.findByUserName(
      user.user_name,
    );

    if (equipments.length >= 1) {
      const updateEquipmentsStatus = equipments.map(async (equipment) => {
        equipment.status = 'pendency';
        await this.equipmentsRepository.save(equipment);
      });

      await Promise.all(updateEquipmentsStatus);
    }

    await this.userAssignmentRepository.deleteManyByUserName(user.user_name);

    return {};
  }
}
