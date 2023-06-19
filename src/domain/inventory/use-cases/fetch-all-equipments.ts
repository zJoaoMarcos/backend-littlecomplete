import { PaginationParams } from '@/core/repositories/pagination-params';
import { IEquipmentRepository } from '@/domain/inventory/repository/equipment.repository';
import { Equipment } from '../entity/equipment';

type FetchAllEquipmentsRequest = {
  params: PaginationParams;
};

type FetchAllEquipmentsResponse = {
  totalCount?: number;
  equipments: Equipment[];
};

export class FetchAllEquipmentsUseCase {
  constructor(private equipmentRepository: IEquipmentRepository) {}

  async execute({
    params,
  }: FetchAllEquipmentsRequest): Promise<FetchAllEquipmentsResponse> {
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
