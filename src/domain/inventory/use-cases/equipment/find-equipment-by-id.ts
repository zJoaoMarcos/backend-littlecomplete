import { EquipmentNotFoundError } from '@/domain/errors/equipment-not-found-error';
import { IEquipmentRepository } from '@/domain/inventory/repository/equipment.repository';

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
      status: string;
      currentUser: string | null;
      patrimony: string | null;
      type: string | null;
      brand: string | null;
      model: string | null;
      serviceTag: string | null;
      purchase: {
        invoice: string | null;
        supplier: string | null;
        purchaseDate: Date | null;
        warranty: string | null;
      };
      department: {
        id: number | null;
        name: string | null;
      };
      config: {
        cpu: string | null;
        ram: string | null;
        video: string | null;
        storage: {
          slots: number | null;
          storage0Type: string | null;
          storage0Syze: number | null;
          storage1Type: string | null;
          storage1Syze: number | null;
        };
      };
    };
  };
};
