import { Auditory } from '@/domain/auditory/entity/auditory';
import { IAuditoryRepository } from '@/domain/auditory/repository/auditory.repository';
import { IUserRepository } from '@/domain/employees/repository/user.repository';
import { UserNotFoundError } from '@/domain/employees/use-cases/errors/user-not-found';
import { IEquipmentRepository } from '@/domain/inventory/repository/equipment.repository';
import { IUserAssignmentsRepository } from '@/domain/inventory/repository/user-assignments.repository';
import { randomUUID } from 'crypto';
import { Equipment } from '../entity/equipment';

interface RemoveAllUserAssignmentsRequest {
  username: string;
  createdBy: string;
}

interface RemoveAllUserAssignmentsResponse {
  equipments: Equipment[];
}

export class RemoveAllUserAssignmentsUseCase {
  constructor(
    private userAssignmentRepository: IUserAssignmentsRepository,
    private userRepository: IUserRepository,
    private equipmentsRepository: IEquipmentRepository,
    private auditoryRepository: IAuditoryRepository,
  ) {}

  async execute({
    username,
    createdBy,
  }: RemoveAllUserAssignmentsRequest): Promise<RemoveAllUserAssignmentsResponse> {
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

    const action = Auditory.create({
      id: randomUUID(),
      type: 'DELETE',
      module: 'Inventory',
      form: 'remove-all-equipments-assignments',
      description: `remove all equipments: ${JSON.stringify(
        equipments.map((equipment) => {
          return equipment.props;
        }),
      )} assignments from user: ${JSON.stringify(user.props)}`,
      createdBy,
      createdAt: new Date(),
    });

    await this.auditoryRepository.create(action);

    return {
      equipments: userEquipments,
    };
  }
}
