import { EquipmentPerUserRepositoryInterface } from 'src/core/repository/equipment-per-user-repository';
import { EquipmentRepositoryInterface } from 'src/core/repository/equipment-repository';
import { UserRepositoryInterface } from 'src/core/repository/user-repository';
import { EquipmentPerUser } from '../../../core/entity/equipment-per-user';
import { EquipmentNotFoundError } from '../errors/equipment-not-found-error';
import { UserNotFoundError } from '../errors/user-not-found';

export class SaveEquipmentPerUserUseCase {
  constructor(
    private equipmentPerUserRepository: EquipmentPerUserRepositoryInterface,
    private userRepository: UserRepositoryInterface,
    private equipmentRepository: EquipmentRepositoryInterface,
  ) {}

  async execute(
    user_id: string,
    equipment_id: string,
  ): Promise<SaveEquipmentPerUserOutput> {
    const userExists = await this.userRepository.findByUserName(user_id);

    if (!userExists) {
      throw new UserNotFoundError();
    }

    const equipmentExists = await this.equipmentRepository.findById(
      equipment_id,
    );

    if (!equipmentExists) {
      throw new EquipmentNotFoundError();
    }

    const equipmentPerUser = new EquipmentPerUser(userExists, equipmentExists);

    await this.equipmentPerUserRepository.save(
      equipmentPerUser.id,
      equipmentPerUser.user,
      equipmentPerUser.equipment,
    );

    return {
      equipmentPerUser,
    };
  }
}

type SaveEquipmentPerUserOutput = {
  equipmentPerUser: {
    id: string;
    user: {
      user_name: string;
      complete_name: string;
      title: string;
      department_id: string;
      telephone: number | null;
      direct_boss: string;
      smtp: string;
      admission_date: string;
      demission_date: string | null;
      status: string;
    };
    equipment: {
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
