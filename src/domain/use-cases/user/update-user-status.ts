/* eslint-disable @typescript-eslint/ban-types */
import { IEquipmentRepository } from 'src/domain/repository/equipment-repository';
import { IUserAssignmentsRepository } from 'src/domain/repository/user-assignments-repository';
import { IUserRepository } from 'src/domain/repository/user-repository';
import { UserNotFoundError } from '../errors/user-not-found';

export class UpdateUserStatusUseCase {
  constructor(
    private userRepository: IUserRepository,
    private userAssignmentsRepository: IUserAssignmentsRepository,
    private equipmentsRepository: IEquipmentRepository,
  ) {}

  async execute({
    status,
    username,
  }: UpdateStatusInput): Promise<UpdateStatusOutput> {
    const user = await this.userRepository.findByUserName(username);

    if (!user) {
      throw new UserNotFoundError();
    }

    if (status === 'disabled') {
      const { equipments } =
        await this.userAssignmentsRepository.findByUserName(user.user_name);

      if (equipments.length >= 1) {
        status = 'pendency';

        const updateEquipmentsStatus = equipments.map(async (equipment) => {
          equipment.status = 'pendency';
          await this.equipmentsRepository.save(equipment);
        });
        await Promise.all(updateEquipmentsStatus);

        await this.userRepository.save(user);
      }

      user.demission_date = new Date();
      user.status = status;

      await this.userRepository.save(user);
      return {};
    }

    if (status === 'vacation') {
      user.status = status;
      await this.userRepository.save(user);
      return {};
    }

    if (status === 'active') {
      user.status = status;
      await this.userRepository.save(user);
      return {};
    }

    throw new Error('Invalid Status');
  }
}

type UpdateStatusInput = {
  username: string;
  status: string;
};

type UpdateStatusOutput = {};
