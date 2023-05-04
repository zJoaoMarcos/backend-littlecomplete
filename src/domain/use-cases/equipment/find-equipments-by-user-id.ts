import { IEquipmentRepository } from 'src/domain/repository/equipment-repository';
import { EquipmentNotFoundError } from '../errors/equipment-not-found-error';

export class FindEquipmentByUserIdUseCase {
  constructor(private equipmentsRepository: IEquipmentRepository) {}

  async execute(userId: string): Promise<FindEquipmentByUserIdOutput> {
    const equipments = await this.equipmentsRepository.findByUserId(userId);

    if (!equipments) {
      throw new EquipmentNotFoundError();
    }

    return {
      equipments,
    };
  }
}

type FindEquipmentByUserIdOutput = {
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
