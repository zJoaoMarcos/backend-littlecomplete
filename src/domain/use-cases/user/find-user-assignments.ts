import { IEquipmentRepository } from 'src/domain/repository/equipment-repository';
import { IUserRepository } from 'src/domain/repository/user-repository';
import { UserNotFoundError } from '../errors/user-not-found';

export class FindUserAssignmentsUseCase {
  constructor(
    private userRepository: IUserRepository,
    private equipmentRepository: IEquipmentRepository,
  ) {}

  async execute(userName: string): Promise<FindUserAssignmentsOutput> {
    const user = await this.userRepository.findByUserName(userName);

    if (!user) {
      throw new UserNotFoundError();
    }

    const equipments = await this.equipmentRepository.findByUserId(
      user.user_name,
    );

    console.log(equipments);

    return {
      user,
      equipments,
    };
  }
}

type FindUserAssignmentsOutput = {
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
  equipments: {
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
      user_id: string | null;
    };
  }[];
};
