import { IEquipmentRepository } from 'src/domain/repository/equipment-repository';

export class FindAllEquipmentsUseCase {
  constructor(private equipmentRepository: IEquipmentRepository) {}

  async execute({
    skip,
    take,
  }: FindAllEquipmentsInput): Promise<FindAllEquipmentsOutput> {
    const { equipments, totalCount } = await this.equipmentRepository.findMany({
      skip,
      take,
    });

    if (!equipments) {
      throw new Error('Equipments not found');
    }

    return {
      equipments,
      totalCount,
    };
  }
}

type FindAllEquipmentsInput = {
  skip?: number;
  take?: number;
};

type FindAllEquipmentsOutput = {
  totalCount?: number;
  equipments: {
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
  }[];
};
