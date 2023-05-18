import { PaginationParams } from 'src/core/repositories/pagination-params';
import { IEquipmentRepository } from 'src/domain/repository/equipment-repository';

export class FetchAllEquipmentsUseCase {
  constructor(private equipmentRepository: IEquipmentRepository) {}

  async execute({
    params,
  }: FetchAllEquipmentsInput): Promise<FetchAllEquipmentsOutput> {
    const { equipments, totalCount } = await this.equipmentRepository.findMany({
      ...params,
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

type FetchAllEquipmentsInput = {
  params: PaginationParams;
};

type FetchAllEquipmentsOutput = {
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
      purchase_date: Date | null;
      department: { id: number; name: string };
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
