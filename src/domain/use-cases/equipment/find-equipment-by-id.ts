import { IEquipmentRepository } from 'src/domain/repository/equipment-repository';
import { EquipmentNotFoundError } from '../errors/equipment-not-found-error';

export class FindEquipmentByIdUseCase {
  constructor(private equipmentsRepository: IEquipmentRepository) {}

  async execute(id: string): Promise<FindEquipmentByIdOutput> {
    const equipment = await this.equipmentsRepository.findById(id);

    if (!equipment) {
      throw new EquipmentNotFoundError();
    }

    return {
      equipment,
    };
  }
}

type FindEquipmentByIdOutput = {
  equipment: {
    props: {
      id: string;
      type: string | null;
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
