import { IUserRepository } from '@/domain/employees/repository/user.repository';
import { IEquipmentRepository } from '@/domain/inventory/repository/equipment.repository';
import { IUserAssignmentsRepository } from '@/domain/inventory/repository/user-assignments.repository';
import { User } from '../entity/user';
import { InvalidStatusRequestError } from './errors/invalid-status-request-error';
import { StatusChangeNotAllowedError } from './errors/status-change-not-allowed-error';
import { UserNotFoundError } from './errors/user-not-found';

interface UpdateStatusRequest {
  username: string;
  status: string;
}

interface UpdateStatusResponse {
  user: User;
}

export class UpdateUserStatusUseCase {
  constructor(
    private userRepository: IUserRepository,
    private userAssignmentsRepository: IUserAssignmentsRepository,
    private equipmentsRepository: IEquipmentRepository,
  ) {}

  async execute({
    status,
    username,
  }: UpdateStatusRequest): Promise<UpdateStatusResponse> {
    const user = await this.userRepository.findByUserName(username);

    if (!user) {
      throw new UserNotFoundError();
    }

    // disabled
    if (status === 'disabled') {
      const { equipments } =
        await this.userAssignmentsRepository.findByUserName(user.user_name);

      if (equipments.length > 0) {
        throw new StatusChangeNotAllowedError();
      }
      user.demission_date = new Date();
      user.status = status;

      await this.userRepository.save(user);
    }

    // pendency
    if (status === 'pendency') {
      user.status = status;

      const { equipments } =
        await this.userAssignmentsRepository.findByUserName(user.user_name);

      if (equipments.length >= 1) {
        status = 'pendency';

        const updateEquipmentsStatus = equipments.map(async (equipment) => {
          equipment.status = 'pendency';
          await this.equipmentsRepository.save(equipment);
        });
        await Promise.all(updateEquipmentsStatus);
      }

      await this.userRepository.save(user);

      return { user };
    }

    // vacation
    if (status === 'vacation') {
      user.status = status;
      await this.userRepository.save(user);
      return { user };
    }

    // active
    if (status === 'active') {
      if (user.status === 'disable') {
        user.admission_date = new Date();
        user.demission_date = null;
        user.status = status;

        await this.userRepository.save(user);

        return { user };
      }

      user.status = status;

      await this.userRepository.save(user);

      return { user };
    }

    throw new InvalidStatusRequestError();
  }
}
