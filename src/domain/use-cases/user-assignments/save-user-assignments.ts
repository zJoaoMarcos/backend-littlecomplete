import { UserAssignments } from '../../../domain/entity/user-assignments';
import { IEquipmentRepository } from '../../../domain/repository/equipment-repository';
import { IUserAssignmentsRepository } from '../../../domain/repository/user-assignments-repository';
import { IUserRepository } from '../../../domain/repository/user-repository';
import { EquipmentNotFoundError } from '../errors/equipment-not-found-error';
import { UserNotFoundError } from '../errors/user-not-found';

export class SaveUserAssignmentsUseCase {
  constructor(
    private userAssignmentsRepository: IUserAssignmentsRepository,
    private userRepository: IUserRepository,
    private equipmentRepository: IEquipmentRepository,
  ) {}

  async execute(
    user_id: string,
    equipment_id: string,
  ): Promise<SaveUserAssignmentsOutput> {
    const user = await this.userRepository.findByUserName(user_id);
    if (!user) {
      throw new UserNotFoundError();
    }

    const equipment = await this.equipmentRepository.findById(equipment_id);

    if (!equipment) {
      throw new EquipmentNotFoundError();
    }

    await this.userAssignmentsRepository.save(user, equipment);

    const userAssignments = UserAssignments.create({
      user,
      equipment,
    });

    return {
      userAssignments,
    };
  }
}

type SaveUserAssignmentsOutput = {
  userAssignments: {
    props: {
      user: {
        props: {
          user_name: string;
          complete_name: string;
          title: string;
          department_id: string;
          telephone: number | null;
          direct_boss: string;
          smtp: string;
          admission_date: Date;
          demission_date: Date | null;
          status: string;
        };
      };
      equipment: {
        props: {
          id: string;
          brand: string;
          model: string;
          supplier: string;
          invoice: string | null;
          warranty: string | null;
          purchase_date: string | null;
          department: string;
          status: string;
          cpu: string | null;
          ram: string | null;
          slots: number | null;
          storage0_type: string | null;
          storage0_syze: number | null;
          storage1_type: string | null;
          storage1_syze: number | null;
          video: string | null;
          service_tag: string | null;
        };
      };
    };
  };
};
