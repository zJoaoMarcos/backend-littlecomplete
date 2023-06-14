import { PaginationParams } from '@/core/repositories/pagination-params';
import { Stock } from '../entity/stock';
import { IStockRepository } from '../repository/stock.repository';

interface FetchAvailableItemsRequest {
  params: PaginationParams;
}

interface FetchAvailableItemsResponse {
  items: Stock[];
  totalCount: number;
}

export class FetchAvailableItemsUseCase {
  constructor(private stockRepository: IStockRepository) {}

  async execute(): Promise<FetchAvailableItemsResponse> {
    const { items, totalCount } = await this.stockRepository.findMany();

    if (!items) {
      throw new Error('Item not found');
    }

    return {
      items,
      totalCount,
    };
  }
}
