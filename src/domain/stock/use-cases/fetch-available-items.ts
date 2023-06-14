import { PaginationParams } from '@/core/repositories/pagination-params';
import { Stock } from '../../entity/stock';
import { IStockRepository } from '../../repository/stock.repository';

interface FetchAvailableItemsRequest {
  params: PaginationParams;
}

interface FetchAvailableItemsResponse {
  items: Stock[];
  totalCount: number;
}

export class FetchAvailableItemsUseCase {
  constructor(private stockRepository: IStockRepository) {}

  async execute({
    params,
  }: FetchAvailableItemsRequest): Promise<FetchAvailableItemsResponse> {
    const { items, totalCount } = await this.stockRepository.findMany(params);

    if (!items) {
      throw new Error('Item not found');
    }

    return {
      items,
      totalCount,
    };
  }
}
