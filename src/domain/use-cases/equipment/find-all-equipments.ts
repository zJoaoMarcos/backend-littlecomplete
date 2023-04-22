import { EquipmentRepositoryInterface } from 'src/core/repository/equipment-repository';

export class FindAllEquipmentsUseCase {
  constructor(private equipmentRepository: EquipmentRepositoryInterface) {}

  async execute(): Promise<FindAllEquipmentsOutput> {
    const equipments = await this.equipmentRepository.findAll();

    if (!equipments) {
      throw new Error('Equipments not found');
    }

    return {
      equipments,
    };
  }
}

type FindAllEquipmentsOutput = {
  equipments: {
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
  }[];
};
