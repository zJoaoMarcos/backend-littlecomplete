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
    supplier?: string;
    invoice?: string;
    warranty?: string;
    purchase_date?: string;
    department: string;
    status: string;
    cpu?: string;
    ram?: string;
    slots?: number;
    storage0_type?: string;
    storage0_syze?: number;
    storage1_type?: string;
    storage1_syze?: number;
    video?: string;
    service_tag?: string;
  }[];
};
