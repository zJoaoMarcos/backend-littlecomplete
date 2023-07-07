import { IUserRepository } from '@/domain/employees/repository/user.repository';
import { IEquipmentRepository } from '@/domain/inventory/repository/equipment.repository';
import { IUserAssignmentsRepository } from '@/domain/inventory/repository/user-assignments.repository';
import { User } from '../entity/user';
import { InvalidStatusRequestError } from './errors/invalid-status-request-error';
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
      const employeesBellowHim = await this.userRepository.findByDirectBoss(
        user.user_name,
      );

      if (employeesBellowHim) {
        const nextDirectBoss = user.direct_boss;

        const updateDirectBossOfEmployees = employeesBellowHim.map(
          async (user) => {
            user.direct_boss = nextDirectBoss;
            await this.userRepository.save(user);
          },
        );

        await Promise.all(updateDirectBossOfEmployees);
      }

      const { equipments: userEquipments } =
        await this.userAssignmentsRepository.findByUserName(user.user_name);

      if (userEquipments.length >= 1) {
        user.status = 'pendency';

        const updateEquipmentsStatus = userEquipments.map(async (equipment) => {
          equipment.status = 'pendency';
          await this.equipmentsRepository.save(equipment);
        });
        await Promise.all(updateEquipmentsStatus);

        await this.userRepository.save(user);

        return { user };
      }

      user.demission_date = new Date();
      user.status = status;

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
      if (user.status === 'disabled' || 'pendency') {
        user.admission_date = new Date();
        user.demission_date = null;
        user.status = status;

        const { equipments: userEquipments } =
          await this.userAssignmentsRepository.findByUserName(user.user_name);

        if (userEquipments) {
          const updateEquipmentsStatus = userEquipments.map(
            async (equipment) => {
              equipment.status = 'in use';
              await this.equipmentsRepository.save(equipment);
            },
          );
          await Promise.all(updateEquipmentsStatus);
        }

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
