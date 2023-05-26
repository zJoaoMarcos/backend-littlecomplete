import { IEquipmentRepository } from 'src/domain/repository/equipment-repository';
import { IUserAssignmentsRepository } from 'src/domain/repository/user-assignments-repository';
import { IUserRepository } from 'src/domain/repository/user-repository';
import { UserNotFoundError } from '../errors/user-not-found';

export class RemoveUserAssignmentsUseCase {
  constructor(
    private userAssignmentRepository: IUserAssignmentsRepository,
    private userRepository: IUserRepository,
    private equipmentsRepository: IEquipmentRepository,
  ) {}

  async execute({ username }: Request) {
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

type Request = {
  username: string;
};
