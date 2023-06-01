import { PaginationParams } from '@/core/repositories/pagination-params';
import { IEquipmentRepository } from '@/domain/inventory/repository/equipment.repository';

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
  }[];
};
