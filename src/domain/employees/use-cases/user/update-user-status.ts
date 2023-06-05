/* eslint-disable @typescript-eslint/ban-types */
import { IUserRepository } from '@/domain/employees/repository/user.repository';
import { UserNotFoundError } from '@/domain/errors/user-not-found';
import { IEquipmentRepository } from '@/domain/inventory/repository/equipment.repository';
import { IUserAssignmentsRepository } from '@/domain/inventory/repository/user-assignments.repository';

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

      if (equipments.length > 0) {
        throw new Error(
          'User cannot be disabled, please remove user assignments',
        );
      }
      user.demission_date = new Date();
      user.status = status;

      await this.userRepository.save(user);
    }

    if (status === 'pendency') {
      user.status = status;

      const { equipments } =
        await this.userAssignmentsRepository.findByUserName(user.user_name);

      if (equipments.length >= 1) {
        const updateEquipmentsStatus = equipments.map(async (equipment) => {
          equipment.status = 'pendency';
          await this.equipmentsRepository.save(equipment);
        });

        await Promise.all(updateEquipmentsStatus);
      }
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