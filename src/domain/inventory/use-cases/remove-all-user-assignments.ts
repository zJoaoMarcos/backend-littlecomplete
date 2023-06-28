import { IUserRepository } from '@/domain/employees/repository/user.repository';
import { UserNotFoundError } from '@/domain/employees/use-cases/errors/user-not-found';
import { IEquipmentRepository } from '@/domain/inventory/repository/equipment.repository';
import { IUserAssignmentsRepository } from '@/domain/inventory/repository/user-assignments.repository';
import { Equipment } from '../entity/equipment';

interface RemoveAllUserAssignmentsRequest {
  username: string;
}

interface RemoveAllUserAssignmentsResponse {
  equipments: Equipment[];
}

export class RemoveAllUserAssignmentsUseCase {
  constructor(
    private userAssignmentRepository: IUserAssignmentsRepository,
    private userRepository: IUserRepository,
    private equipmentsRepository: IEquipmentRepository,
  ) {}

  async execute({ username }: RemoveAllUserAssignmentsRequest) {
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

    const { equipments: userEquipments } =
      await this.userAssignmentRepository.findByUserName(username);

    return {
      userEquipments,
    };
  }
}
